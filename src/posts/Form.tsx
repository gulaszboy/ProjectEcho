import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '.';
import { User } from '../users';

import styled from "styled-components";
import TopBar from '../general/TopBar';

const Wrapper = styled.div`
    width: 60%;
    margin: auto;

    padding: 15px;

    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #eee;
`

const InputElement = styled.div`
    max-width: 373px;
    margin: 10px auto;
    text-align: left;
`

const TitleInput = styled.input`
    width: 331px;
`

const Button = styled.button`
    height: 30px;

    border-radius: 5px;

    margin: 5px;
    color: black;
    cursor: pointer;

    :disabled {
        opacity: 0.65;
        cursor: inherit;
    };
`


const RestyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`

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
        const isButtonDisabled = author === "" || title === "" || body === ""

        const userList = users.map((val, i) => <option value={val._id} key={val._id}>{val.firstName} {val.lastName}</option>)
        return (
            <>
                <TopBar >
                    <RestyledLink to="/posts"> | Posts </RestyledLink>
                    | New
                </TopBar>
                <Wrapper>
                    <h1>Add new post</h1>
                    <form onSubmit={this.handleSubmit}>
                        <InputElement>
                            <label htmlFor="author">Author: </label>
                            <select id="author" name="author" value={author} onChange={this.handleChange}>
                                <option disabled hidden value="" > Pick user </option>
                                {userList}
                            </select>
                        </InputElement>

                        <InputElement>
                            <label htmlFor="title">Title: </label>
                            <TitleInput type="text" id="title" placeholder="Title" name="title" value={title} onChange={this.handleChange} />
                        </InputElement>
                        <InputElement>
                            <textarea value={body} onChange={this.handleChange} name="body" rows={8} cols={50} placeholder="Your article" />
                        </InputElement>


                        <Button disabled={isButtonDisabled}>Send</Button>
                        <RestyledLink to="/posts">
                            <Button type="button">
                                Cancel
                            </Button>
                        </RestyledLink>
                    </form>
                </Wrapper>
            </>
        )
    }
}

export default Form;