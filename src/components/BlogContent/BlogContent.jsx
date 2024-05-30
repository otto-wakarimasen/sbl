import { Component } from "react";
import "./BlogContent.css";
import { BlogCard } from "./components/BlogCard";
import { AddPostForm } from "./components/AddPostForm";
import axios from "axios";
import { postsUrl } from "../../shared/projectData";
import CircularProgress from '@mui/material/CircularProgress';

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArr: [],
    isPending: false,
  };

  fetchPosts = () => {
    axios
      .get(postsUrl)
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPending: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  likePost = (blogPost) => {

    const temp = {...blogPost};
    temp.liked = !temp.liked

    axios.put(`https://664f2c35fafad45dfae2a845.mockapi.io/posts/${blogPost.id}`, temp)
        .then((response) => {
            console.log("Пост изменён =>", response.data)
            this.fetchPosts();
        })
        .catch((err) => {
            console.log(err)
          })
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Вы уверены, что хотите удалить ${blogPost.title} ?`)) {
        this.setState({
            isPending: true,
          });
      axios
        .delete(
          `https://664f2c35fafad45dfae2a845.mockapi.io/posts/${blogPost.id}`
        )
        .then((response) => {
          console.log("Пост удалён -> ", response.data);
          this.fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  addNewBlogPost = (blogPost) => {
    this.setState({
        isPending: true,
      });
    axios
      .post("https://664f2c35fafad45dfae2a845.mockapi.io/posts/", blogPost)
      .then((response) => {
        console.log("Пост создан =>", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAddFormShow = () => {
    this.setState({
      showAddForm: true,
    });
  };

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false,
    });
  };

  handleEscape = (e) => {
    if (e.key === "Escape" && this.state.showAddForm) this.handleAddFormHide();
  };

  componentDidMount() {
    this.fetchPosts();
    window.addEventListener("keyup", this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
        />
      );
    });
    if (this.state.blogArr.length === 0) return <h1>Загружаю данные...</h1>;
    
    const postsOpacity = this.state.isPending ? 0.5 : 1

    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}

        <>
          <h1 className="pstatitle">Блог</h1>
          <div className="addNewPost">
            <button className="blackBtn" onClick={this.handleAddFormShow}>
              Создать новый пост
            </button>
          </div>
          <div className="posts" style={{opacity: postsOpacity}}>
            {blogPosts}
          </div>
          {this.state.isPending && <CircularProgress className="preloader" />}
        </>
      </div>
    );
  }
}
