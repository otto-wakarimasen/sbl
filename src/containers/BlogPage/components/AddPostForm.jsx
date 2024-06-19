import { Component } from 'react';
import s from './AddPostForm.module.css'
import CancelIcon from '@mui/icons-material/Cancel';

export class AddPostForm extends Component {

    state = {
        postTitle: '',
        postDesc: ''
    }

    handlePostTitleChange = e => {
        this.setState({
            postTitle: e.target.value
        })
    }

    handlePostDescChange = e => {
        this.setState({
            postDesc: e.target.value
        })
    }

    createPost = (e) => {
        e.preventDefault()
        const post = {
            title: this.state.postTitle,
            description: this.state.postDesc,
            liked: false
        }
        this.props.addNewBlogPost(post)
        this.props.handleAddFormHide()
    }

    handleEscape = (e) => {
        if (e.key === "Escape") this.props.handleAddFormHide();
    };

    componentDidMount() {
        window.addEventListener('keyup', this.handleEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape)
    }


    render() {
        const handleAddFormHide = this.props.handleAddFormHide
        return (
            <>
                <form className={s.addPostForm} onSubmit={this.createPost}>
                    <button className={s.hideBtn} onClick={handleAddFormHide}><CancelIcon /></button>
                    <h2>Создание поста</h2>
                    <div>
                        <input
                            className={s.addFormInput}
                            type="text"
                            name="postTitle"
                            placeholder='Заголовок поста'
                            value={this.state.postTitle}
                            onChange={this.handlePostTitleChange}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            className={s.addFormInput}
                            name="postDescription"
                            placeholder='Описание поста'
                            value={this.state.postDesc}
                            onChange={this.handlePostDescChange}
                            required
                        />
                    </div>
                    <div>
                        <button
                            className={s.blackBtn}
                            type="submit">
                            Добавить пост
                        </button>
                    </div>
                </form>
                <div onClick={handleAddFormHide} className={s.overlay}></div>
            </>
        )
    }
}