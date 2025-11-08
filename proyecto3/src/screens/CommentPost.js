// import React from "react";
// import { Component } from "react";
// import { Text } from "react-native";
// import { Pressable } from "react-native";
// import { TextInput } from "react-native-web";
// import { View } from "react-native-web";
// import { StyleSheet } from "react-native";

// class CommentPost extends Component {
//     constructor(props){
//         super(props)
//         this.state={
//             nuevocomentario: "",
//             comentarios: [],
//         }
//     }
//     componentDidMount(){
//         let postId= this.props.postId; 
//     }
//     onSubmit(){
//         console.log(this.state);
//         console.log(this.props);
        
        
//     }

//     render(){
//         return(
//         <View style={styles.container}> 
        
    
//                 <TextInput   style={styles.input} keyboardType='default'  placeholder='comentarios' onChangeText={ text => this.setState({comentarios:text}) }value={this.state.userName} />
//                 <Pressable style={styles.button} onPress={() => this.onSubmit()}>
//                 <Text style={styles.buttonText} >Enviar </Text> 
//                 </Pressable>

//               <View> 
//                 <Text> {this.state.comentarios}</Text>
//               </View>

//         </View>
            
//         )
//     }
// }

// const styles = StyleSheet.create({

//   container: {
//     paddingHorizontal: 10,
//     marginTop: 20,
//   },

//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },

//   input: {
//     height: 48,
//     borderWidth: 1,
//     borderColor: "#cbd5e1",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     backgroundColor: "#ffffff",
//     marginVertical: 8,
//   },


//   button: {
//     backgroundColor: "#f87171",
//     paddingVertical: 12,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 12,
//   },

//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//   },


//   linkText: {
//     color: "#007bff",
//     marginBottom: 15,
//   },


// });

// export default CommentPost

import React, { Component } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

class CommentPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.route.params.id, 
      comentario: "",
      comentarios: [],
      error: ""
    };
  }

  componentDidMount() {
    let postId = this.state.postId;

    db.collection("posts")
      .doc(postId)
      .onSnapshot((doc) => {
        const data = doc.data();
        let arr = [];
        if (data) {
          if (data.comments) {
            arr = data.comments;
          }
        }
        this.setState({ comentarios: arr });
      });
  }

  onSubmit() {
    let postId = this.state.postId;
    let comentarioActual = this.state.comentario;
    let listaActual = this.state.comentarios;

    if (!auth.currentUser) {
      this.props.navigation.navigate("Login");
      return;
    }

    if (comentarioActual === "") {
      this.setState({ error: "El comentario no puede estar vacío." });
      return;
    }

    let nuevoComentario = {
      email: auth.currentUser.email,
      texto: comentarioActual,
      createdAt: Date.now()
    };

   
    let nuevaLista = listaActual.concat(nuevoComentario);

    db.collection("posts")
      .doc(postId)
      .update({ comments: nuevaLista })
      .then(() => {
        this.setState({ comentario: "", error: "" });
      })
      .catch(() => {
        this.setState({ error: "No se pudo guardar el comentario." });
      });
  }


render() {
  return (
    <View style={styles.container}>
      {this.state.comentarios.length === 0 ? (
        <Text style={styles.vacio}>No hay comentarios aún.</Text>
      ) : (
        <FlatList
          data={this.state.comentarios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text style={styles.commentEmail}>{item.email}</Text>
              <Text style={styles.commentText}>{item.texto}</Text>
            </View>
          )}
        />
      )}

      <TextInput
        style={styles.input}
        keyboardType="default"
        placeholder="Escribe un comentario..."
        onChangeText={(text) => this.setState({ comentario: text })}
        value={this.state.comentario}
      />

      {this.state.error !== "" ? <Text style={styles.error}>{this.state.error}</Text> : null}

      <Pressable style={styles.btn} onPress={() => this.onSubmit()}>
        <Text style={styles.btnTxt}>Enviar</Text>
      </Pressable>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  vacio: { fontStyle: "italic", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 10 },
  btn: { backgroundColor: "#28a745", paddingVertical: 10, borderRadius: 8, alignItems: "center", marginTop: 10 },
  btnTxt: { color: "#fff", fontWeight: "700" },
  error: { color: "red", marginTop: 8 },
  commentItem: { backgroundColor: "#f6f6f6", borderRadius: 8, padding: 10, marginBottom: 8 },
  commentEmail: { fontWeight: "600", marginBottom: 4 },
  commentText: {}
});

export default CommentPost;
