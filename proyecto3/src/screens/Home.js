import React from "react";
import { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { db, auth } from "../firebase/config";
import Post from "../components/Post"
class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            comentarios: [],
            loading: true
        }
    }
   componentDidMount(){
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.setState({
          comentarios: posts,
          loading: false
        });
      });
  }

    render(){
        console.log(this.props);
        
        return(
            <View> 
                <Text> Home </Text>
                <FlatList data={this.state.comentarios} keyExtractor={item => item.id.toString()} renderItem={ ({item, i}) => <Post posteo={item.data} navigation={this.props.navigation}/>}/>
            </View>
        )
    }
}

export default Home