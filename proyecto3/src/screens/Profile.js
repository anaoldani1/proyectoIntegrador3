import React from "react";
import { Component } from "react";
import { Pressable } from "react-native";
import { View, Text, FlatList } from "react-native";
import { db, auth } from "../firebase/config";
import { StyleSheet } from "react-native";

class Profile extends Component {
      constructor(props){
        super(props);
        this.state={
            posts: [],
        }
    }

    render(){
        return(
                 <Pressable onPress={ ()=> this.props.navigation.navigate("Login")}>
                    <Text style={styles.button} >Desloguerase </Text>
                </Pressable>
        )
    }
}

const styles = StyleSheet.create({
      button: {
    width: 150,
    backgroundColor: "#f87171",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
})


export default Profile
