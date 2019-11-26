import React from 'react';
import { User } from '.';
import { Link } from 'react-router-dom';
import { Post } from '../posts';

import styled from 'styled-components';
import TopBar from '../general/TopBar';
import PostComponent from '../posts/PostComponent';

const RestyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`

const Wrapper = styled.div`
    width: 80%;

    padding: 15px 40px;

    background: #eee;
    margin: 10px auto;
    border-radius: 10px;
`

const DataPiece = styled.div`
    margin: 10px auto;
    max-width: 500px
    display: flex;
`

const Button = styled.button`
    height: 30px;

    border-radius: 5px;

    margin: 5px;
    color: black;
    cursor:pointer;
`

const TitleLine = styled.h1`
    width: 80%;
    margin: auto;

    text-align: left;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

type Props = {
    user: User,
}

type State = {
    posts: Array<Post>
}

export class UserDetails extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { posts: [] }
    }

    componentDidMount() {
        const { user } = this.props;
        fetch(`http://localhost:8081/api/users/${user._id}`)
            .then(resp => resp.json())
            .then(resp => this.setState({ posts: resp.posts }))
    }

    render() {
        const { email, firstName, lastName, phone, address, _id } = this.props.user
        const { posts } = this.state;

        const postList = posts.map(p => (
            <PostComponent post={p} key={p._id} />
        ))

        return (
            <>
                <TopBar >
                    <RestyledLink to="/users"> | Users </RestyledLink>
                    | Details
                </TopBar>

                <TitleLine>User profile</TitleLine>
                <Wrapper>
                    <DataPiece>Name: {firstName} {lastName}</DataPiece>
                    <DataPiece>Phone: {phone}</DataPiece>
                    <DataPiece>Email: {email}</DataPiece>
                    <DataPiece>Address: {address}</DataPiece>

                    <RestyledLink to="/users">
                        <Button>
                            Return
                        </Button>
                    </RestyledLink>
                    <RestyledLink to={`/users/${_id}/edit`}>
                        <Button>
                            Edit
                        </Button>
                    </RestyledLink>
                </Wrapper>

                <TitleLine>
                    <span>Users posts </span>
                    <Button type="button">
                        <RestyledLink to="/posts/new">New post</RestyledLink>
                    </Button>
                </TitleLine>
                {postList}
            </>
        )
    }
}

export default UserDetails;