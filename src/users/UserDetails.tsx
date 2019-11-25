import React from 'react';
import { User } from '.';

type Props = {
    user: User,
}

export class UserDetails extends React.Component<Props> {
    render() {
        const { email, firstName, lastName, phone } = this.props.user
        return (
            <>
                <h1>User details</h1>
                <div>{firstName} {lastName}</div>
                <div>{phone}</div>
                <div>{email}</div>
            </>
        )
    }
}

export default UserDetails;