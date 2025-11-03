import React from "react";
import { Component } from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { FlatList, View } from "react-native-web";
import { db } from "../firebase/config";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-web";
import { auth } from "../firebase/config";

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
      likes: []         // emails de usuarios que likearon
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
        <Pressable onPress={() => this.props.navigation.navigate("HomeMenu")}>
          <Text style={styles.linkText}>Volver al menú</Text>
        </Pressable>

        <Text style={styles.title}>Nuevo Post</Text>

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="mensaje"
          onChangeText={ text => this.setState({ Mensaje: text }) }
          value={this.state.Mensaje}
        />


        <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.Mensaje)}>
          <Text style={styles.buttonText}>Guardar posts</Text>
        </Pressable>

        <Pressable onPress={() => this.props.navigation.navigate("Login")}>
          <Text>Ir al Login</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{ flex: 1, padding: 16 },
  linkText:{ marginBottom: 10, textDecorationLine: "underline" },
  title:{ fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  input:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 8
  },
  error:{ color: "red", marginBottom: 8 },
  button:{
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 12
  },
  buttonText:{ color: "#fff", fontWeight: "bold" }
});

export default NewPost;
