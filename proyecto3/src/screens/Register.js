import React from "react";
import { Component } from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";
 
class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            email: "",
            userName: "", 
            password: "", 
            registered: "",
            alertaMail: "",
            alertaUser: "",
            alertaPass: "",
            error: "",
        }
    }

    onSubmit(email, pass, user){
        console.log(this.state);

        // obligatoreidad
        this.state.email.length == 0 ? true : this.setState({
            alertaMail: "Campo Obligatorio"
        })
        this.state.userName.length == 0 ? true : this.setState({
            alertaUser: "Campo Obligatorio"
        })
        this.state.password.length == 0 ? true : this.setState({
            alertaPass: "Campo Obligatorio"
        })
        
        ///guardo los usuarios en la coleccion users
        auth.createUserWithEmailAndPassword(email, pass)
          .then( response => {
              db.collection('users').add({
                email: email,
                password: pass,
                userName: user,
                createdAt: Date.now(),
            })
            .then(()=> console.log("usuario guardado en fire"))

            //si no se loguea correctamente muestro el error
            .catch( e => this.setstate({
                error: e
            }))

            this.setState({registered: true})
            this.props.navigation.navigate("Login")
          })     

          .catch( e => console.log(e))
    }

    render(){
        return(
        <View style={styles.container}> 
            <Text>{this.state.error}</Text>

            <Text style={styles.title}>Email</Text>
            <TextInput   style={styles.input}  keyboardType='email-address'  placeholder='email' onChangeText={ text => this.setState({email:text}) }value={this.state.email} />
            
            <Text style={styles.title}>Nombre de usuario</Text>
            <TextInput  style={styles.input} keyboardType='default'  placeholder='userName' onChangeText={ text => this.setState({userName:text}) }value={this.state.userName} />
            
            <Text style={styles.title}>Contraseña</Text>
            <TextInput  style={styles.input} keyboardType='default' placeholder='password'  secureTextEntry={true}  onChangeText={ text => this.setState({password:text}) }value={this.state.password}/> 
            
            <Pressable style={styles.button}  onPress={ ()=> this.onSubmit(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.buttonText}>Registrarse </Text>
            </Pressable>

            <Pressable onPress={ ()=> this.props.navigation.navigate("Login")}>
                    <Text style={styles.linkText} > Ya tengo cuenta </Text>
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

export default Register