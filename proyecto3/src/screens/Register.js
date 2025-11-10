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
        this.state.email.length !== 0 ? true : this.setState({
            alertaMail: "Campo Obligatorio"
        })
        this.state.userName.length !== 0 ? true : this.setState({
            alertaUser: "Campo Obligatorio"
        })
        this.state.password.length !== 0 ? true : this.setState({
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
            .then(()=> {
              console.log("usuario guardado en fire")

              auth.signOut()
                .then(() => {
                  this.setState({ registered: true });
                  this.props.navigation.navigate("Login");
                })
                .catch(e => this.setState({
                error: e.message
                }))
            })
            //si no se loguea correctamente muestro el error
            .catch( e => this.setState({
                error: e.message
            }))

            this.setState({registered: true})
            this.props.navigation.navigate("Login")
          })     
          .catch(e => {
            console.log(e)
            if (e.message == "The email address is badly formatted.") {
              this.setState({
                error: "Ingresá correctamente el mail"
              })
            }
            if(e.message == "Password should be at least 6 characters"){
              this.setState({
                error: "La contraseña debe tener mas de 6 caracteres"
              })
            }
            }
        )
    }

    render(){
        return(
        <View style={styles.container}> 
            <Text>{this.state.error}</Text>
               <Text style={styles.titulo}>Registro</Text>
           <View style={styles.form}> 
            <Text style={styles.title}>Email</Text>
            <Text style={styles.errorText}>{this.state.alertaMail}</Text>
            <TextInput   style={styles.input}  keyboardType='email-address'  placeholder='email' onChangeText={ text => this.setState({email:text}) }value={this.state.email} />
             </View>
            <Text style={styles.title}>Nombre de usuario</Text>
            <Text style={styles.errorText}>{this.state.alertaUser}</Text>
            <TextInput  style={styles.input} keyboardType='default'  placeholder='userName' onChangeText={ text => this.setState({userName:text}) }value={this.state.userName} />
            
            <Text style={styles.title}>Contraseña</Text>
            <Text style={styles.errorText}>{this.state.alertaPass}</Text>
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
    flex: 1,
    backgroundColor: "#fefcfb",
    padding: 24,
    alignItems: "center", 
    justifyContent: "center",
  },
  titulo:{
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "calibri", 
    color: "#111827",
    marginBottom: 8,
  },

  

  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "calibri", 
    color: "#111827",
    marginBottom: 8,
    
  },

   form: {
    alignItems: "center",
  },

  input: {
    height: 48,
    width:400,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    marginVertical: 8,
  },

  button: {
    backgroundColor: "#f87171",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    width: 200,
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
  },


});

export default Register