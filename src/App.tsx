import React from 'react';
import './App.css';
import UserList from './users';

import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" >
                        <UserList />
                    </Route >
                    <Route path="/users" >
                        <UserList />
                    </Route >
                </Switch>
            </div>
        </Router>
    );
}

export default App;
