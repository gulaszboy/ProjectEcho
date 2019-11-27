import React from 'react';
import UsersPanel from './users';

import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import PostsPanel from './posts/';
import Landing from './landing';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Switch>

                    <Route path="/users" >
                        <UsersPanel />
                    </Route >
                    <Route path="/posts" >
                        <PostsPanel />
                    </Route >
                    <Route path="/" >
                        <Landing />
                    </Route >
                </Switch>
            </div>
        </Router>
    );
}

export default App;
