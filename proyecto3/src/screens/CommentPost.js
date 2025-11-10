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
      error: "", 
      postData: null
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
        const postData = data ? { descripcion: data.mensaje, owner: data.email} : null;
        this.setState({ comentarios: arr, postData: postData });
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
    {/* PARA QUE SE VEA EL POST QUE ESTAS COMENTANDO  */}
     {this.state.postData ? (
      <View style={styles.postCard}>
        <Text style={styles.postDescripcion}>{this.state.postData.descripcion}</Text>
        <Text style={styles.postOwner}>Publicado por: {this.state.postData.owner}</Text>
  </View>
) : null}

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
        <Text style={styles.btnTxt}>Publicar comentario</Text>
      </Pressable>

      <Pressable style={styles.btnVolver} onPress={() => this.props.navigation.navigate("HomeMenu")}>
           <Text style={styles.btnVolverTxt}>Volver a Home</Text>
    </Pressable>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    padding: 16 },

  titulo: { 
    fontSize: 20, 
    fontWeight: "700", 
    marginBottom: 10 },

  vacio: { 
    fontStyle: "italic",
     marginBottom: 10 },

  input: 
  { borderWidth: 1,
     borderColor: "#ccc", 
     borderRadius: 8, 
     padding: 10,
    marginTop: 10 , 
    height: 100,
    width:500,
  },

  btn: { 
    backgroundColor: "#f87171",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    width: 500,
    paddingVertical: 10, 
    borderRadius: 8, 
    alignItems: "center",
     marginBottom: 100 },

  btnTxt:
   { color: "#fff",
     fontWeight: "700" ,
    },

    btnVolver: {
  backgroundColor: "#fff",
  borderWidth: 2,
  borderColor: "#f87171",
  borderRadius: 12,
  paddingVertical: 10,
  paddingHorizontal: 20,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 16,
  width: 500,
},

btnVolverTxt: {
  color: "#f87171",
  fontWeight: "700",
  fontSize: 16,
},


    // styles para lp del ppst 
   postCard: {
  backgroundColor: "#ffe4e6", 
  borderWidth: 1,
  borderColor: "#f87171", 
  borderRadius: 10,
  padding: 16,
  marginBottom: 20,
},

postDescripcion: {
  fontSize: 16,
  color: "#111827",
  marginBottom: 6,
  fontWeight: "500",
},

postOwner: {
  fontSize: 13,
  color: "#6b7280",
  fontStyle: "italic",
},


  error: { color: "red", marginTop: 8 },
  commentItem: 
  { backgroundColor: "#f6f6f6", 
    borderRadius: 8,
    padding: 10,
     marginBottom: 8 },

  commentEmail: { fontWeight: "600", marginBottom: 4 },
  commentText: {}

});

export default CommentPost;
