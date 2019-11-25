import React from 'react';
import { User } from '.';
import { Link } from 'react-router-dom';

type Props = {
    users: Array<User>,
    updateUserList: (users: Array<User>) => void,
}

export class UserList extends React.Component<Props> {
    constructor(props: Props) {
        super(props)

        this.deleteUser = this.deleteUser.bind(this);
    }


    deleteUser(id: string) {
        const { updateUserList } = this.props;

        fetch(`http://localhost:8081/api/users/${id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(resp => updateUserList(resp.users))
    }

    render() {
        const { users } = this.props;

        const size = 10;
        const list = users.filter((u, i) => i < size).map(user =>
            <p
                key={user._id}
            >
                {user.firstName} : {user.lastName} : {user.email}
                <Link to={`/users/${user._id}`}>More</Link>
                <Link to={`/users/${user._id}/edit`}>Edit</Link>
                <button type="button" onClick={() => this.deleteUser(user._id)}>Delete</button>
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