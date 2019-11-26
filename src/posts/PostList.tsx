import React from 'react';
import { Post } from '.';
import PostComponent from './PostComponent';

import TopBar from '../general/TopBar';
import { User } from '../users';

type Props = {
    posts: Array<Post>,
    updateList: (posts: Array<Post>) => void,
}

type State = {
    users: Array<User>
}

export class PostList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { users: [] }
        this.handleDeletePost = this.handleDeletePost.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8081/api/users")
            .then(resp => resp.json())
            .then(resp => this.setState({ users: resp.users }))
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
        const { posts, updateList } = this.props;
        const { users } = this.state;

        const size = 10;
        const list = posts.filter((p, i) => i < size).map(post =>
            <PostComponent
                users={users}
                key={post._id}
                post={post}
                deletePost={this.handleDeletePost}
                updateList={updateList}
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