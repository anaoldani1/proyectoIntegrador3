import React from "react";
import { Component } from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";

class Profile extends Component {
      constructor(props){
        super(props)
    }
    render(){
        return(
                 <Pressable onPress={ ()=> this.props.navigation.navigate("Login")}>
                    <Text>Desloguerase </Text>
                </Pressable>
        )
    }
}

export default Profile