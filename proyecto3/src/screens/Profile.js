import React from "react";
import { Component } from "react";
import { Pressable } from "react-native";
import { View, Text, FlatList } from "react-native";
import { db, auth } from "../firebase/config";

class Profile extends Component {
      constructor(props){
        super(props);
        this.state={
            posts: [],
        }
    }

    render(){
        return(
                <View>
                    <Text>{auth.currentUser.email}</Text>
                    <Text>{auth.currentUser.userName}</Text>
                    <Pressable onPress={ ()=> this.props.navigation.navigate("Login")}>
                        <Text> Desloguerase </Text>
                    </Pressable>
                </View>
        )
    }
}

export default Profile


