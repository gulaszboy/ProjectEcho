import React from 'react';
import './App.css';
import UsersPanel from './users';

import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import PostsPanel from './posts/';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Switch>

                    <Route path="/users" >
                        <UsersPanel />
                    </Route >
                    <Route path="/posts" >
                        <PostsPanel />
                    </Route >
                    <Route path="/" >
                        <UsersPanel />
                    </Route >
                </Switch>
            </div>
        </Router>
    );
}

export default App;
