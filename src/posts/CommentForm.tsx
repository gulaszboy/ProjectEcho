import React from 'react';
import { User } from '../users';
import { Post } from '.';

type Props = {
    users: Array<User>,
    updateList: (posts: Array<Post>) => void,
    post: Post,
}

type State = {
    author: string,
    text: string,
    [key: string]: any,
}

export class CommentForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            author: "",
            text: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { post, updateList } = this.props;

        const data = { ...this.state, id: post._id };
        fetch(`http://localhost:8081/api/posts/${post._id}/comments`, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(resp => { updateList(resp) })

        this.setState({ author: "", text: "", })
    };


    handleChange = (e: React.FormEvent) => {
        this.setState({ [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value });
    };

    render() {
        const { users } = this.props;
        const { author, text } = this.state

        const isButtonDisabled = author === "" || text === ""

        const userList = users.map((val, i) => <option value={val._id} key={val._id}>{val.firstName} {val.lastName}</option>)
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="author">Author: </label>
                <select id="author" name="author" value={author} onChange={this.handleChange}>
                    <option disabled hidden value="" > Pick user </option>
                    {userList}
                </select>

                <label htmlFor="text">Text:</label>
                <input type="text" id="text" placeholder="Your comment" name="text" value={text} onChange={this.handleChange} />
                <button disabled={isButtonDisabled}>Add</button>
            </form>
        )
    }
}

export default CommentForm;