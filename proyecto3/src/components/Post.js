import React from "react";
import { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            comentario: this.props.posteo.mensaje,
            usuario: this.props.posteo.email,
            likes: this.props.posteo.likes.length,
            likeado: this.props.posteo.likes.includes(auth.currentUser.email)
        }
    }
    likear(){
        let usuarioActual = auth.currentUser.email;

          db.collection('posts')
          .doc(this.props.id)
          .update({
            likes: this.state.likeado ? firebase.firestore.FieldValue.arrayRemove(usuarioActual) : firebase.firestore.FieldValue.arrayUnion(usuarioActual)
          })
          .then(() => {
            this.setState({
                likeado: !this.state.likeado, 
                likes: this.props.posteo.likes.length //sino no se actualiza la nueva cantidad de likes
            })
          })
          .catch(e => console.log(e))
      }

      
    render(){
        return(
            <View style={styles.container}> 
            <Text style={styles.emailUsuario}>{this.state.usuario}</Text>
            <Text style={styles.tituloComentario}>Comentario:</Text>
            <Text style={styles.textoComentario}>{this.state.comentario}</Text>
            <Text style={styles.textoLikes}>Likes: {this.state.likes}</Text>
    
            <View style={styles.botonesFila}>
              <Pressable 
                style={[styles.botonAccion]} 
                onPress={() => this.likear()}>
                <Text style={styles.textoBotonAccion}>
                  {this.state.likeado ? "Quitar like" : "Me gusta"}
                </Text>
              </Pressable>
    
             <Pressable style={styles.botonAccion} onPress={() => this.props.navigation.navigate("CommentPost", { id: this.props.postId })}>
               <Text style={styles.textoBotonAccion}>Comentar</Text> 
               </Pressable>
            </View>
          </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ffffff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#e5e7eb",
    },
    emailUsuario: {
      fontSize: 14,
      fontWeight: "600",
      color: "#111827",
      marginBottom: 6,
    },
    tituloComentario: {
      fontSize: 14,
      fontWeight: "600",
      color: "#111827",
    },
    textoComentario: {
      fontSize: 14,
      color: "#1f2933",
      marginBottom: 8,
    },
    textoLikes: {
      fontSize: 14,
      color: "#6b7280",
      marginBottom: 10,
    },
    botonesFila: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    botonAccion: {
      backgroundColor: "#f87171",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    botonLikeActivo: {
      backgroundColor: "#fbcccc",
      borderWidth: 1,
      borderColor: "#f87171",
    },
    textoBotonAccion: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 14,
      textAlign: "center",
    },
  });
  

export default Post