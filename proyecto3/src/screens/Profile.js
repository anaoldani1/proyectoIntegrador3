import React from "react";
import { Component } from "react";
import { Pressable } from "react-native";
import { View, Text, FlatList } from "react-native";
import { db, auth } from "../firebase/config";
import { StyleSheet } from "react-native";

class Profile extends Component {
      constructor(props){
        super(props);
        this.state={
            posts: [],
            userMail: "",
            userName: "",
        }
    }

    borrarPost(id){
        db.collection('posts')
        .doc(id)
        .update({
          borrado: true
        })
        .then(() => console.log("post eliminado"))
        .catch(e => console.log(e))
      }

      deslogear(){
        auth.signOut()
        .then(() => {
          console.log("deslogueado");
          this.props.navigation.navigate("Login");
        })
        .catch(e => console.log(e))
      }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            console.log(user)
            if(user){
                db.collection('users')
                .where('email', '==', user.email)
                .onSnapshot(docs => {
                docs.forEach(doc => {
                    this.setState({
                        userName: doc.data().userName,
                        userMail: user.email  
                    })
                })
             })

                db.collection('posts')
                .where('email', '==', user.email)
                .onSnapshot(docs => {

                let postsUser = [];

                docs.forEach(doc => {
                    if (!doc.data().borrado) {
                        postsUser.push({
                        id: doc.id,
                        data: doc.data()
                        })
                    }
                })
                this.setState({
                    posts: postsUser,
                    userMail: user.email,
                })
                })
            } else{
               this.props.navigation.navigate("Login"); 
            }
        })
    }


    render(){
        return(
<View style={styles.container}>
        <Text style={styles.title}>Mi perfil ({this.state.userName})</Text>
        <Text style={styles.text}>Email: {this.state.userMail}</Text>
        <Text style={styles.subtitle}>Mis posteos</Text>

        <FlatList data={this.state.posts} keyExtractor={item => item.id.toString()} renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.postTexto}>{item.data.mensaje}</Text>
              <Pressable style={styles.deleteButton} onPress={() => this.borrarPost(item.id)}>
                <Text style={styles.deleteText}>Borrar</Text>
              </Pressable>
            </View>
        )}/>

        <Pressable style={styles.logoutButton} onPress={() => this.deslogear()}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fefcfb",
      padding: 24,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      fontFamily: "calibri",
      color: "#111827",
      marginBottom: 12,
    },
    text: {
      fontSize: 16,
      fontFamily: "calibri",
      color: "#111827",
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "600",
      fontFamily: "calibri",
      color: "#111827",
      marginTop: 16,
      marginBottom: 8,
    },
    postContainer: {
      backgroundColor: "#ffffff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#e5e7eb",
    },
    postTexto: {
      fontSize: 14,
      fontFamily: "calibri",
      color: "#1f2933",
      marginBottom: 10,
    },
    deleteButton: {
      alignSelf: "flex-start",
      backgroundColor: "#fee2e2",
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    deleteText: {
      color: "#ef4444",
      fontWeight: "600",
      fontSize: 14,
      fontFamily: "calibri",
    },
    logoutButton: {
      marginTop: 16,
      backgroundColor: "#f87171",
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
    },
    logoutText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "calibri",
    },
  });

export default Profile
