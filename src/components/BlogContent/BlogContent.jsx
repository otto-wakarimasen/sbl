import { Component } from "react"
import { posts } from "../../shared/projectData"
import "./BlogContent.css"
import { BlogCard } from "./components/BlogCard"
import { AddPostForm } from "./components/AddPostForm"


export class BlogContent extends Component {

state = {
    showAddForm: false,
    blogArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
}

likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked

    this.setState({
        blogArr: temp
    })
    localStorage.setItem('blogPosts', JSON.stringify(temp))
}

deletePost = pos => {
    if (window.confirm(`Вы уверены, что хотите удалить ${this.state.blogArr[pos].title} ?`)) {
        const temp = [...this.state.blogArr];
        temp.splice(pos, 1);
    
        this.setState({
            blogArr: temp
        })

    localStorage.setItem('blogPosts', JSON.stringify(temp))
    }
}

handleAddFormShow = () => {
    this.setState({
        showAddForm: true
    })
}

handleAddFormHide = () => {
    this.setState({
        showAddForm: false
    })
}

render() {
const blogPosts = this.state.blogArr.map((item, pos) => {
        return (
            <BlogCard 
            key = {item.id}
            title = {item.title}
            description = {item.description}
            liked = {item.liked}
            likePost = {() => this.likePost(pos)}
            deletePost = {() => this.deletePost(pos)}
            />
        )
    })
        return (
            <>
            {
                this.state.showAddForm ? <AddPostForm handleAddFormHide={this.handleAddFormHide} /> : null
            }
                
                    <>
                        <h1 className="pstatitle">Simple Blog</h1>
                        <button className="blackBtn" onClick={this.handleAddFormShow}>Создать новый пост</button>
                        <div className="posts">
                            {blogPosts}
                        </div>
                    </>
            </>
        )
    }
}