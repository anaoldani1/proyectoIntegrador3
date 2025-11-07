import React from "react";
import { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            comentario: this.props.posteo.mensaje,
            usuario: this.props.posteo.email,
        }
    }
    render(){

        return(
        <View style={styles.container}> 
            <Text>{this.state.usuario}</Text>
            <Text>Comentario: {this.state.comentario}</Text>
            <Text>Likes: </Text>
            <Pressable onPress={ ()=> this.props.navigation.navigate("Login")}>Comentar</Pressable>
            <Text>Usuario: {this.state.usuario}</Text>

             <Pressable onPress={ ()=> this.props.navigation.navigate("CommentPost")}>
                                <Text style={styles.linkText} > Comentar </Text>
              </Pressable>
        </View>
            
        )
    }
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    height: 40, 
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },


  button: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#28a745",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
  },


  linkText: {
    color: "#007bff",
    marginBottom: 15,
  },


});

export default Post