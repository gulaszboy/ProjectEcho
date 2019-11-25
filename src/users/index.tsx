import React from 'react';
import { Link } from 'react-router-dom';
interface User {
    firstName: string,
    lastName: string,
    email: string,
}

type UserListState = {
    users: Array<User>
}

export class UserList extends React.Component<{}, UserListState> {
    constructor(props: any) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch("api/users")
            .then(resp => resp.json())
            .then(resp => this.setState({ users: resp.users }))
    }

    render() {
        const { users } = this.state;

        if (users.length === 0) return (<h1>Please wait</h1>)

        const size = 10;
        const list = users.filter((u, i) => i < size).map(user =>
            <p>
                {user.firstName} : {user.lastName} : {user.email}
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
            </p>)

        return (
            <>
                <Link to="/users/new">New user</Link>
                {list}
            </>
        );
    }

}

export default UserList;
