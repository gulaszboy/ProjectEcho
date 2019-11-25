import React from 'react';
import { User } from '.';
import { Link } from 'react-router-dom';

type Props = {
    user: User,
}

export class UserDetails extends React.Component<Props> {
    render() {
        const { email, firstName, lastName, phone, address } = this.props.user
        return (
            <>
                <h1>User details</h1>
                <div>{firstName} {lastName}</div>
                <div>{phone}</div>
                <div>{email}</div>
                <div>{address}</div>

                <Link to="/users">Return</Link>
            </>
        )
    }
}

export default UserDetails;