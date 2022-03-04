import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import "./New.css";

class New extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { image, author, place, description, hashtags } = this.state;
    const data = new FormData();
    data.append("image", image);
    data.append("author", author);
    data.append("place", place);
    data.append("description", description);
    data.append("hashtags", hashtags);
    await api.post("/posts", data);
    this.props.navigate("/");
  };

  handleImageChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { author, place, description, hashtags } = this.state;
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />
        <input
          type="text"
          name="author"
          placeholder="Post author"
          onChange={this.handleInput}
          value={author}
        />
        <input
          type="text"
          name="place"
          placeholder="Post local"
          onChange={this.handleInput}
          value={place}
        />
        <input
          type="text"
          name="description"
          placeholder="Post description"
          onChange={this.handleInput}
          value={description}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Post hashtags"
          onChange={this.handleInput}
          value={hashtags}
        />
        <button type="submit">Post</button>
      </form>
    );
  }
}

export default (props) => <New navigate={useNavigate()} />;
