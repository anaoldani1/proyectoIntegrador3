import React from "react";
import { Component } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { auth } from "../firebase/config";


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      userName: "",
      password: "",
      loggedIn: "",
      alertaMail: "",
      alertaP: "",
      error: ""
    }
  }

  onSubmit(email, pass) {
    console.log(this.state);
    this.setState({ alertaMail: "", alertaP: "", error: "" })
    if (!this.state.email.includes("@")) {
      this.setState({ alertaMail: "Email mal formateado" })
      return
    }
    if (this.state.password.length < 6) {
      this.setState({ alertaP: "La password debe tener una longitud mínima de 6 caracteres" })
      return
    }

    auth.signInWithEmailAndPassword(email, pass)
      .then((response) => {
        this.setState({ loggedIn: true });
        this.props.navigation.navigate("HomeMenu")
      })
      .catch(error => {
        this.setState({ error: 'Credenciales incorrectas.' })
      })



  }

  render() {
    return (
      
      <View style={styles.container}>

        <Text style={styles.title}>Iniciar sesión</Text>

        {/* <Pressable onPress={() => this.props.navigation.navigate("HomeMenu")}>
          <Text style={styles.texto2}> Entrar en la app </Text>


        </Pressable> */}
        <Text style={styles.title}>Email</Text>
        <TextInput style={styles.input} keyboardType='email-address' placeholder='Ingrese su email' onChangeText={text => this.setState({ email: text })} value={this.state.email} />
        <Text> {this.state.alertaMail}</Text>

        <Text style={styles.title}>Contraseña</Text>
        <TextInput style={styles.input} keyboardType='default' placeholder='Ingrese su contraseña' secureTextEntry={true} onChangeText={text => this.setState({ password: text })} value={this.state.password} />
        <Text> {this.state.alertaP}</Text>
        <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.userName)}>
          <Text>Login </Text>
        </Pressable>

        <Pressable onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={styles.linkText} >No tengo cuenta  </Text>
        </Pressable>
        
         <Text> {this.state.error}</Text>


        <View>
          <Text> {this.state.email}</Text>
          <Text> {this.state.password}</Text>
        </View>


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

export default Login