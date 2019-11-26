import React from 'react';
import { Post } from '.';

import styled from "styled-components";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { User } from '../users';
import CommentForm from './CommentForm';

const TitleLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.h2`
    margin: 0;
    margin-bottom: 5px;
`
const Author = styled.h5`
    margin: 5px 0;
    text-align: left;
`

const Wrapper = styled.div`
    width: 80%;

    padding: 15px 40px;

    background: #eee;
    margin: 10px auto;

    border-radius: 10px;
`

const Button = styled.button`
    width:30px;
    height: 30px;

    border-radius: 5px;

    margin: 3px;
    color: black;
    cursor: pointer;
`

const RestyledLink = styled(Link)`
    color: black;
    text-decoration: none;
`

const Body = styled.div`
    text-align: left;
    margin: 20px 0;
`

type Props = {
    post: Post,
    users?: Array<User>,
    updateList?: (posts: Array<Post>) => void,
    deletePost?: (id: string) => void,
}

export class PostComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleDeleteComment = this.handleDeleteComment.bind(this)
    }

    handleDeleteComment(id: string) {
        const { post, updateList } = this.props;

        fetch(`http://localhost:8081/api/posts/${post._id}/comments/${id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(resp => updateList ? updateList(resp) : null)
    }

    render() {
        const { post, deletePost, users, updateList } = this.props;
        const comments = post.comments.map(c =>
            <div>
                {c.author}: {c.text} <button onClick={() => this.handleDeleteComment(c._id)}>x</button>
            </div>
        )
        return (
            <Wrapper >
                <TitleLine>
                    <Title>{post.title}</Title>

                    <div>
                        <RestyledLink to={`/posts/${post._id}/edit`}>
                            <Button type="button">
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </RestyledLink>
                        {deletePost ? <Button type="button" onClick={() => deletePost(post._id)}>
                            <b>x</b>
                        </Button> : null}
                    </div>
                </TitleLine>

                {post.author.firstName ? <Author>Added by: {post.author.firstName} {post.author.lastName} {`(${post.author.email})`}</Author> : null}
                <Body>{post.body}</Body>
                {comments}
                {users && updateList ? <CommentForm users={users} post={post} updateList={updateList} /> : null}
            </Wrapper>
        )
    }
}

export default PostComponent;