import { Component } from "react";
import s from "./BlogContent.module.css";
import { BlogCard } from "./components/BlogCard";
import { AddPostForm } from "./components/AddPostForm";
import axios from "axios";
import { postsUrl } from "../../shared/projectData";
import CircularProgress from '@mui/material/CircularProgress';
import { EditPostForm } from "./components/EditPostForm";

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    showEditForm: false,
    blogArr: [],
    isPending: false,
    selectedPost: {}
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

    const temp = { ...blogPost };
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

  editBlogPost = (updatetdBlogPost) => {
    this.setState({
      isPending: true,
    });
    axios.put(`https://664f2c35fafad45dfae2a845.mockapi.io/posts/${updatetdBlogPost.id}`, updatetdBlogPost)
      .then((response) => {
        console.log("Пост отредактирован =>", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  handleEditFormShow = () => {
    this.setState({
      showEditForm: true,
    });
  };

  handleEditFormHide = () => {
    this.setState({
      showEditForm: false,
    });
  };

  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost
    })
  }

  componentDidMount() {
    this.fetchPosts();
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
          handleEditFormShow={this.handleEditFormShow}
          handleSelectPost={() => this.handleSelectPost(item)}
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

        {this.state.showEditForm && (
          <EditPostForm
            handleEditFormHide={this.handleEditFormHide}
            selectedPost={this.state.selectedPost}
            editBlogPost={this.editBlogPost}
          />
        )}

        <>
          <h1 className={s.pstatitle}>Блог</h1>
          <div className={s.addNewPost}>
            <button className={s.blackBtn} onClick={this.handleAddFormShow}>
              Создать новый пост
            </button>
          </div>
          <div className={s.posts} style={{ opacity: postsOpacity }}>
            {blogPosts}
          </div>
          {this.state.isPending && <CircularProgress className={s.preloader} />}
        </>
      </div>
    );
  }
}