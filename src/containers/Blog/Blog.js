import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
//import axios from "axios";
import axios from "../../axios"; //refering to the instance object defined in axios.js file

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false,
  };

  componentDidMount() {
    //first argument is the url we send http requests to, second argument holds the cofiguration
    //Primise object: a default javascript object introduced with ES6
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((x) => {
          return { ...x, author: "Archana" };
        });
        this.setState({ posts: updatedPosts });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // return Promise.reject(error);
        this.setState({ error: true });
      });
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((x) => {
        return (
          <Post
            key={x.id}
            title={x.title}
            author={x.author}
            clicked={() => this.postSelectedHandler(x.id)}
          ></Post>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
