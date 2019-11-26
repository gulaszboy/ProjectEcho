import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '.';
import { User } from '../users';

type State = {
    title: string,
    body: string,
    author: string,
    users: Array<User>,
    [key: string]: any
}

type Props = {
    updateList: (posts: Array<Post>) => void,
    post?: Post,
}

export class Form extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        if (!this.props.post) {
            this.state = {
                users: [],
                title: "",
                body: "",
                author: ""
            };
        }
        else {
            const { title, body, author } = this.props.post
            this.state = { users: [], title, body, author: author._id };
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8081/api/users")
            .then(resp => resp.json())
            .then(resp => this.setState({ users: resp.users }))
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { post, updateList } = this.props
        const url = "http://localhost:8081/api/posts" + (post ? `/${post._id}` : `/`)
        const data = this.state

        fetch(url, {
            method: post ? 'PUT' : "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(resp => updateList(resp))
    };


    handleChange = (e: React.FormEvent) => {
        this.setState({ [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value });
    };

    render() {
        const { title, body, author, users } = this.state;

        const userList = users.map((val, i) => <option value={val._id} key={val._id}>{val.firstName} {val.lastName}</option>)
        return (
            <form onSubmit={this.handleSubmit}>

                <label htmlFor="author">Author</label>
                <select id="author" name="author" value={author} onChange={this.handleChange}>
                    <option disabled hidden value="" > Pick user </option>
                    {userList}
                </select>

                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Title" name="title" value={title} onChange={this.handleChange} />

                <textarea value={body} onChange={this.handleChange} name="body" />

                <button>Send</button>
                <Link to="/posts">Cancel</Link>
            </form>
        )
    }
}

export default Form;