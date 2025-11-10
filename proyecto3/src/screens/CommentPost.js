import React, { Component } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase/app";

class CommentPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.route.params.id, //id del post
      comentario: "",
      comentarios: [], //lo q la gent coment en el post
      error: "",
    };
  }

  componentDidMount() {
    let postId = this.state.postId; 

    db.collection("posts")
      .doc(postId)
      .onSnapshot((doc) => {
        let data = doc.data();
        let array = data.comments;

        let postData = data ? { descripcion: data.mensaje, owner: data.email } : null; //[ara armar el post]

        this.setState({ comentarios: array, postData: postData });
      });
  }

  onSubmit() {
    let postId = this.state.postId; 
    let comentarioActual = this.state.comentario;

    if (!auth.currentUser) {
      this.props.navigation.navigate("Login");
    }

    if (comentarioActual === "") {
      this.setState({ error: "El comentario no puede estar vacío." });
    }

    let nuevoComentario = {
      email: auth.currentUser.email,
      texto: comentarioActual,
      createdAt: Date.now(),
    };


    db.collection("posts")
      .doc(postId)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(nuevoComentario),
      })
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
            keyExtractor={(index) => index.toString()} 
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

        <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
          <Text style={styles.botonText}>Publicar comentario</Text>
        </Pressable>

        <Pressable style={styles.botonVolver} onPress={() => this.props.navigation.navigate("HomeMenu")}>
          <Text style={styles.botonVolverText}>Volver a Home</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefcfb",
    padding: 24,
  },
  vacio: {
    fontStyle: "italic",
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    marginBottom: 8,
    height: 100,
    textAlignVertical: "top",
    backgroundColor: "#ffffff",
  },
  boton: {
    backgroundColor: "#f87171",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  botonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  botonVolver: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#f87171",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  botonVolverText: {
    color: "#f87171",
    fontWeight: "700",
    fontSize: 16,
  },
  postCard: {
    backgroundColor: "#ffe4e6",
    borderWidth: 1,
    borderColor: "#f87171",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  error: {
    color: "#dc2626",
    marginTop: 8,
    fontSize: 14,
  },
  commentItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  commentEmail: {
    fontWeight: "600",
    fontSize: 13,
    color: "#111827",
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: "#1f2933",
  },
});

export default CommentPost;
