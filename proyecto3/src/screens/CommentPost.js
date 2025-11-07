import React from "react";
import { Component } from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { View } from "react-native-web";
import { StyleSheet } from "react-native";

class CommentPost extends Component {
    constructor(props){
        super(props)
        this.state={
            comentarios: "",
        }
    }

    onSubmit(){
        console.log(this.state);
        console.log(this.props);
        
        
    }

    render(){
        return(
        <View style={styles.container}> 
        
    
                <TextInput   style={styles.input} keyboardType='default'  placeholder='comentarios' onChangeText={ text => this.setState({comentarios:text}) }value={this.state.userName} />
                <Pressable style={styles.button} onPress={() => this.onSubmit()}>
                <Text style={styles.buttonText} >Enviar </Text> 
                </Pressable>

              <View> 
                <Text> {this.state.comentarios}</Text>
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
    height: 48,
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

export default CommentPost