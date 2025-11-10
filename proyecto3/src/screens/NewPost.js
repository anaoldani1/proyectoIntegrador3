import React from "react";
import { Component } from "react";
import { Text, Pressable, View, StyleSheet, TextInput } from "react-native";
import { db, auth } from "../firebase/config";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Mensaje: "",
      error: ""
    };
  }

  componentDidMount(){
    // Solo usuarios logueados
    if (!auth.currentUser) {
      this.props.navigation.navigate("Login");
    }
  }

  onSubmit(mensaje) {
    // no vacío y usuario logueado
    if (!auth.currentUser) {
      this.props.navigation.navigate("Login");
      return;
    }

    if (mensaje === "") {
      this.setState({ error: "El post no puede estar vacío." });
      return;
    }

    db.collection("posts").add({
      email: auth.currentUser.email,
      mensaje: mensaje,
      createdAt: Date.now(),
      likes: []    , // emails de usuarios que likearon
      comments: [],
    })
    .then(() => {
      this.setState({ Mensaje: "", error: "" });
      this.props.navigation.navigate("Home");
    })
    .catch(error => {
      console.log(error);
      this.setState({ error: "No se pudo crear el post." });
    });
  }

  render(){
    return(
      <View style={styles.container}>

        <Text style={styles.title}>Crear nuevo post</Text>

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="mensaje"
          onChangeText={ text => this.setState({ Mensaje: text }) }
          value={this.state.Mensaje}
        />


        <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.Mensaje)}>
          <Text style={styles.buttonText}>Publicar post</Text>
        </Pressable>

      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fefcfb",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1e3a5f",
  },

  input: {
    height:0,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 6,
    padding: 10,
    height:150,
    textAlignVertical: "top",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    color: "#1e293b",
  },

  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 14,
    fontFamily: "calibri",
  },

  button: {
    backgroundColor: "#f87171",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontFamily: "calibri",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default NewPost;
