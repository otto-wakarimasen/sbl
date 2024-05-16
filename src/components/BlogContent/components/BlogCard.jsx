import './BlogCard.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const BlogCard = ({
    id, 
    title,
    description,
    liked,
    likePost,
    deletePost
}) => {

const heartFill = liked ? 'crimson' : 'black'

        return(
            <div key={id} className="post">
                <div className="postContent">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <div>
                        <button onClick={likePost}>
                            <FavoriteIcon style={{fill: heartFill}} />
                        </button>
                </div>
                    <button className="deleteBtn" onClick={deletePost}>
                        <DeleteForeverIcon />
                    </button>
                </div>
            </div>
        )
}