import React from 'react';
import { User } from '.';
import { Link } from 'react-router-dom';

type Props = {
    users: Array<User>
}

export class UserList extends React.Component<Props> {
    render() {
        const { users } = this.props;

        const size = 10;
        const list = users.filter((u, i) => i < size).map(user =>
            <p
                key={user._id}
            >
                {user.firstName} : {user.lastName} : {user.email}
                <Link to={`/users/${user._id}`}>More</Link>
                <button>Edit</button>
                <button>Delete</button>
            </p>)

        return (
            <>
                <Link to="/users/new">New user</Link>
                {list}
            </>
        )
    }
}

export default UserList;