export const BlogCard = (props) => {
    return(
        <div key={props.id} className="post">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
    </div>
    )
}