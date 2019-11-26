import React from 'react';
import { Post } from '.';
import PostComponent from './PostComponent';

import TopBar from '../general/TopBar';

type Props = {
    posts: Array<Post>,
    updateList: (posts: Array<Post>) => void,
}

export class PostList extends React.Component<Props> {
    constructor(props: Props) {
        super(props)

        this.handleDeletePost = this.handleDeletePost.bind(this);
    }


    handleDeletePost(id: string) {
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
            <PostComponent
                key={post._id}
                post={post}
                deletePost={this.handleDeletePost}
            />)

        return (
            <>
                <TopBar link={{ to: "posts/new", text: "New post" }}> | Posts </TopBar>
                {list}
            </>
        )
    }
}

export default PostList;