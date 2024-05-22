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

handleEscape = (e) => {
    if (e.key === 'Escape' && this.state.showAddForm) this.handleAddFormHide()
}

addNewBlogPost = (blogPost) => {
    this.setState((state) => {
        const posts = [...state.blogArr];
        posts.push(blogPost);
        localStorage.setItem('blogPosts', JSON.stringify(posts))
        return {
            blogArr: posts
        }
    })
}

componentDidMount() {
    window.addEventListener('keyup', this.handleEscape)
   }

componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape)
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
            <div className="blogPage">
            {
                this.state.showAddForm ? (
                <AddPostForm 
                blogArr={this.state.blogArr} 
                addNewBlogPost={this.addNewBlogPost}
                handleAddFormHide={this.handleAddFormHide}
                /> 
                ) : null
            }
                
                    <>
                        <h1 className="pstatitle">Блог</h1>
                            <div className="addNewPost">
                            <button 
                            className="blackBtn" 
                            onClick={this.handleAddFormShow}>
                                Создать новый пост
                            </button>
                            </div>
                        <div className="posts">
                            {blogPosts}
                        </div>
                    </>
            </div>
        )
    }
}