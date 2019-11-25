import React from 'react';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import Form from './Form';
import UserDetails from './UserDetails';
import UserList from './UserList';

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    _id: string,
}

type UsersPanelState = {
    users: Array<User>
}

type Props = RouteComponentProps

export class UsersPanel extends React.Component<Props, UsersPanelState> {
    constructor(props: any) {
        super(props)
        this.state = {
            users: []
        }

        this.updateUserList = this.updateUserList.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:8081/api/users")
            .then(resp => resp.json())
            .then(resp => this.setState({ users: resp.users }))
    }

    updateUserList(users: Array<User>) {
        this.setState({ users })
        this.props.history.push("/users")
    }

    render() {
        const { users } = this.state;
        if (users.length === 0) return (<h1>Please wait</h1>)

        return (
            <div>
                <Switch>
                    <Route path="/users/new" >
                        <Form updateUserList={this.updateUserList} />
                    </Route >
                    <Route path="/users/:id/edit"
                        render={({ match }) => {
                            // eslint-disable-next-line
                            const user = users.find(u => u._id == match.params.id)
                            if (!user) return <Redirect to="/users" />

                            return <Form user={user} updateUserList={this.updateUserList} />
                        }}
                    />
                    <Route path="/users/:id"
                        render={({ match }) => {
                            // eslint-disable-next-line
                            const user = users.find(u => u._id == match.params.id)
                            if (!user) return <Redirect to="/users" />

                            return <UserDetails user={user} />
                        }}
                    />
                    <Route path="/users" >
                        <UserList users={users} />
                    </Route >
                </Switch>
            </div>
        );
    }

}

export default withRouter(UsersPanel);
