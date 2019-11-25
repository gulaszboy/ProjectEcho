import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Form from './Form';
import UserDetails from './UserDetails';
import UserList from './UserList';

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    _id: string,
}

type UsersPanelState = {
    users: Array<User>
}

export class UsersPanel extends React.Component<{}, UsersPanelState> {
    constructor(props: any) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8081/api/users")
            .then(resp => resp.json())
            .then(resp => this.setState({ users: resp.users }))
    }

    render() {
        const { users } = this.state;
        if (users.length === 0) return (<h1>Please wait</h1>)

        return (
            <div>
                <Switch>
                    <Route path="/users/new" >
                        <Form />
                    </Route >
                    <Route path="/users/:id"
                        render={({ match }) => {
                            // eslint-disable-next-line
                            const user = users.find(u => u._id == match.params.id)
                            if (!user) return <Redirect to="/users" />

                            return <UserDetails user={user} />
                        }}
                    >
                    </Route >
                    <Route path="/users" >
                        <UserList users={users} />
                    </Route >
                </Switch>
            </div>
        );
    }

}

export default UsersPanel;
