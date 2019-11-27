import React from 'react';
import { Comment } from '.';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    width: 60%;

    padding: 5px 20px;

    background: #ddd;
    margin-left: auto;
    margin-top: 5px;

    border-radius: 10px;

    text-align: left;
`

const Button = styled.button`
    border-radius: 5px;
    position: absolute;
    bottom: 2px;
    right: 5px;

    margin: 3px;
    color: black;
    cursor: pointer;
`

type Props = {
    comment: Comment,
    deleteComment: (id: string) => void,
}

class CommentComponent extends React.Component<Props> {

    render() {
        const { comment, deleteComment } = this.props
        return (
            <Wrapper>
                <strong>{comment.author.firstName} {comment.author.lastName}</strong>: {comment.text}
                <Button onClick={() => deleteComment(comment._id)}>x</Button>
            </Wrapper>
        )
    }
}


export default CommentComponent;