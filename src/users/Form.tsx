import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '.';

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
    margin: 10px auto;
    max-width: 300px
    display: flex;
    justify-content: space-between;
`

const RestyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`

const Button = styled.button`
    height: 30px;

    border-radius: 5px;

    margin: 5px;
    color: black;

    :disabled {
        opacity: 0.65;
        cursor: inherit;
    };
`

type State = {
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    [key: string]: any
}

type Props = {
    updateUserList: (users: Array<User>) => void,
    user?: User,
}

export class Form extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        if (!this.props.user) {
            this.state = {
                email: "",
                firstName: "",
                lastName: "",
                phone: "",
                address: "",
            };
        }
        else {
            const { email, firstName, lastName, phone, address } = this.props.user
            this.state = { email, firstName, lastName, phone, address };
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { user, updateUserList } = this.props
        const url = "http://localhost:8081/api/users" + (user ? `/${user._id}` : `/`)
        const data = this.state

        fetch(url, {
            method: user ? 'PUT' : "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(resp => updateUserList(resp.users))
    };


    handleChange = (e: React.FormEvent) => {
        this.setState({ [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value });
    };

    render() {
        const { email, firstName, lastName, phone, address } = this.state;
        const isButtonDisabled = email === "" || firstName === "" || lastName === "" || phone === "" || address === ""

        return (
            <>
                <TopBar >
                    <RestyledLink to="/users"> | Users </RestyledLink>
                    | New
                </TopBar>
                <Wrapper>
                    <h1>Add new user</h1>
                    <form onSubmit={this.handleSubmit}>
                        <InputElement>
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" placeholder="First Name" name="firstName" value={firstName} onChange={this.handleChange} />
                        </InputElement>
                        <InputElement>
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" placeholder="Last Name" name="lastName" value={lastName} onChange={this.handleChange} />
                        </InputElement>
                        <InputElement>
                            <label htmlFor="email">Email:</label>
                            <input type="text" id="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} />
                        </InputElement>
                        <InputElement>
                            <label htmlFor="phone">Phone:</label>
                            <input type="text" id="phone" placeholder="Phone" name="phone" value={phone} onChange={this.handleChange} />
                        </InputElement>
                        <InputElement>
                            <label htmlFor="address">Address:</label>
                            <textarea
                                value={address}
                                onChange={this.handleChange}
                                name="address"
                                placeholder="Your address"
                                rows={5}
                                cols={30}
                            />
                        </InputElement>
                        <Button disabled={isButtonDisabled}>Send</Button>
                        <Button type="button">
                            <RestyledLink to="/users">Cancel</RestyledLink>
                        </Button>
                    </form>
                </Wrapper>
            </>
        )
    }
}

export default Form;