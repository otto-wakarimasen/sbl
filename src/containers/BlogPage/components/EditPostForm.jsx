import { Component } from 'react';
import s from './EditPostForm.module.css'
import CancelIcon from '@mui/icons-material/Cancel';

export class EditPostForm extends Component {

    state = {
        postTitle: this.props.selectedPost.title,
        postDesc: this.props.selectedPost.description
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

    savePost = (e) => {
        e.preventDefault()
        const post = {
            id: this.props.selectedPost.id,
            title: this.state.postTitle,
            description: this.state.postDesc,
            liked: this.props.selectedPost.liked,
        }
        this.props.editBlogPost(post)
        this.props.handleEditFormHide()
    }

    handleEscape = (e) => {
        if (e.key === "Escape") this.props.handleEditFormHide();
    };

    componentDidMount() {
        window.addEventListener('keyup', this.handleEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape)
    }

    render() {
        const handleEditFormHide = this.props.handleEditFormHide
        return (
            <>
                <form className={s.editPostForm} onSubmit={this.savePost}>
                    <button className={s.hideBtn} onClick={handleEditFormHide}><CancelIcon /></button>
                    <h2>Редактирование поста</h2>
                    <div>
                        <input
                            className={s.editFormInput}
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
                            className={s.editFormInput}
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
                            Сохранить
                        </button>
                    </div>
                </form>
                <div onClick={handleEditFormHide} className={s.overlay}></div>
            </>
        )
    }
}