import './BlogCard.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export const BlogCard = ({
    id, 
    title,
    description,
    liked,
    likePost,
    deletePost
}) => {

    const heartFill = liked ? 'crimson' : 'black'

    return (
        <div key={id} className="post">
            <div className="postContent">
                <div>
                <div><h2>{title}</h2></div>
                <div><p>{description}</p></div> 
                </div>
                <div><button className='editBtn'>
                    <EditIcon />
                </button>
                <button className="deleteBtn" onClick={deletePost}>
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