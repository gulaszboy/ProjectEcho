import React from 'react';
import './App.css';
import UserList from './users';

import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import Form from './users/Form';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">

                <Switch>
                    <Route
                        exact path="/"
                        render={props => <UserList {...props} />}
                    />
                    <Route
                        exact path="/users"
                        render={props => <UserList {...props} />}
                    />
                    <Route
                        exact path="/users/new"
                        render={props => <Form {...props} />}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
