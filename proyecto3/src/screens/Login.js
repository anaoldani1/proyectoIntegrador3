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
  componentDidMount(){
    ///SI YA ESTA LOGUEADO QUE NO MW LLEVE IGUAL A LOGIN
    auth.onAuthStateChanged(user => {
      console.log(user)
      if(user){
      this.props.navigation.navigate("HomeMenu");
      }
  })
  }

  render() {
    return (
      
      <View style={styles.container}>

        <Text style={styles.titulo}>Iniciar sesión</Text>
        <View style={styles.form}> 
        <Text style={styles.title}>Email</Text>
        <TextInput style={styles.input} keyboardType='email-address' placeholder='Ingrese su email' onChangeText={text => this.setState({ email: text })} value={this.state.email} />
        </View>
        <Text style={styles.errorText}> {this.state.alertaMail}</Text>

        <Text style={styles.title}>Contraseña</Text>
        <TextInput style={styles.input} keyboardType='default' placeholder='Ingrese su contraseña' secureTextEntry={true} onChangeText={text => this.setState({ password: text })} value={this.state.password} />
        <Text style={styles.errorText}> {this.state.alertaP}</Text>
        <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.userName)}>
          <Text style={styles.buttonText}>Login </Text>
        </Pressable>

        <Pressable onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={styles.linkText} >No tengo cuenta  </Text>
        </Pressable>

         <Text> {this.state.error}</Text>


      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefcfb",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "calibri",
    color: "#111827",
    marginBottom: 24,
    textAlign: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "calibri",
    color: "#111827",
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    marginBottom: 12,
    alignSelf: "stretch",   // hace que el input ocupe todo el ancho disponible
  },

  button: {
    backgroundColor: "#f87171",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },

  buttonText: {
    color: "#fff",
    fontFamily: "calibri",
    fontWeight: "600",
    fontSize: 16,
  },

  errorText: {
    color: "#dc2626",
    fontSize: 14,
    marginBottom: 6,
    fontFamily: "calibri",
  },

  linkText: {
    color: "#f87171",
    fontSize: 16,
    fontFamily: "calibri",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 16,
  },
});


export default Login