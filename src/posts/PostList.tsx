import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '.';

type Props = {
    posts: Array<Post>,
    updateList: (posts: Array<Post>) => void,
}

export class PostList extends React.Component<Props> {
    constructor(props: Props) {
        super(props)

        this.deletePost = this.deletePost.bind(this);
    }


    deletePost(id: string) {
        const { updateList } = this.props;

        fetch(`http://localhost:8081/api/posts/${id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(resp => updateList(resp))
    }

    render() {
        const { posts } = this.props;

        const size = 10;
        const list = posts.filter((p, i) => i < size).map(post =>
            <div
                key={post._id}
            >
                <div>{post.title}</div>
                <div>{post.body}</div>

                <Link to={`/posts/${post._id}`}>More</Link>
                <Link to={`/posts/${post._id}/edit`}>Edit</Link>
                <button type="button" onClick={() => this.deletePost(post._id)}>Delete</button>
            </div>)

        return (
            <>
                <Link to="/posts/new">New post</Link>
                {list}
            </>
        )
    }
}

export default PostList;