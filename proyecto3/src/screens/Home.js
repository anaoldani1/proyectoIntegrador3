import React from "react";
import { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";
import Post from "../components/Post"
class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            comentarios: [],
            loading: true
        }
    }
   componentDidMount(){
        auth.onAuthStateChanged(user => {
            console.log(user)
            if(!user){
            this.props.navigation.navigate("Login");
            }
        })
        
        db.collection("posts")
        .orderBy("createdAt", "desc")
        .onSnapshot((docs) => {
            let posts = [];
            docs.forEach((doc) => {
            posts.push({
                id: doc.id,
                data: doc.data()
            });
            });
            this.setState({
            comentarios: posts,
            loading: false
            });
        });
  }

    render(){
        console.log(this.props);
        
        return(
            <View style={styles.container}>  
                <Text style={styles.container}> Home </Text>
                <FlatList data={this.state.comentarios} keyExtractor={item => item.id.toString()} renderItem={ ({item, i}) => <Post posteo={item.data} navigation={this.props.navigation} id={item.id} postId={item.id} email={item.data.email} />}/>
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
  });

export default Home