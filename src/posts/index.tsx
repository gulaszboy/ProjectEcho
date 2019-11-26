import React from 'react';
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { User } from '../users';
import PostList from './PostList';
import Form from './Form';

export type Post = {
    title: string,
    body: string,
    author: User,
    _id: string,
}

type State = {
    posts: Array<Post>
}

type Props = RouteComponentProps

export class PostsPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            posts: []
        }
        this.updateList = this.updateList.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:8081/api/posts")
            .then(resp => resp.json())
            .then(resp => this.setState({ posts: resp }))
    }
    updateList(posts: Array<Post>) {
        this.setState({ posts })
        this.props.history.push("/posts")
    }

    render() {
        const { posts } = this.state;
        if (posts.length === 0) return (<h1>Please wait</h1>)

        return (
            <div>
                <Switch>
                    <Route path="/posts/new" >
                        <Form updateList={this.updateList} />
                    </Route >
                    <Route path="/posts/:id/edit"
                        render={({ match }) => {
                            // eslint-disable-next-line
                            const post = posts.find(p => p._id == match.params.id)
                            if (!post) return <Redirect to="/posts" />

                            return <Form post={post} updateList={this.updateList} />
                        }}
                    />
                    {/* <Route path="/posts/:id"
                        render={({ match }) => {
                            // eslint-disable-next-line
                            const user = users.find(u => u._id == match.params.id)
                            if (!user) return <Redirect to="/users" />

                            return <UserDetails user={user} />
                        }}
                    /> */}
                    <Route path="/" >
                        <PostList
                            posts={posts}
                            updateList={this.updateList}
                        />
                    </Route >
                </Switch>
            </div>
        );
    }

}

export default withRouter(PostsPanel) 
