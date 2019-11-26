import React from 'react';
import { User } from '.';
import { Link } from 'react-router-dom';
import { Post } from '../posts';

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
        const { email, firstName, lastName, phone, address } = this.props.user
        const { posts } = this.state;

        const postList = posts.map(p => (
            <div>
                <div>{p.title}</div>
                <div>{p.body}</div>
            </div>
        ))

        return (
            <>
                <h1>User details</h1>
                <div>{firstName} {lastName}</div>
                <div>{phone}</div>
                <div>{email}</div>
                <div>{address}</div>

                <Link to="/users">Return</Link>

                {postList}
            </>
        )
    }
}

export default UserDetails;