import s from './BlogCard.module.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export const BlogCard = ({
    id,
    title,
    description,
    liked,
    likePost,
    deletePost,
    handleEditFormShow,
    handleSelectPost
}) => {

    const showEditForm = () => {
        handleSelectPost();
        handleEditFormShow()
    }

    const heartFill = liked ? 'crimson' : 'black'

    return (
        <div key={id} className={s.post}>
            <div className={s.postContent}>
                <div>
                    <div><h2>{title}</h2></div>
                    <div><p>{description}</p></div>
                </div>
                <div className={s.postControl}>
                    <button className={s.editBtn} onClick={showEditForm}>
                        <EditIcon />
                    </button>
                    <button className={s.deleteBtn} onClick={deletePost}>
                        <DeleteForeverIcon />
                    </button>
                </div>
            </div>
            <div>
                <button onClick={likePost}>
                    <FavoriteIcon style={{ fill: heartFill }} />
                </button>
            </div>
        </div>
    )
}