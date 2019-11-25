import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '.';

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
        return (
            <form onSubmit={this.handleSubmit}>

                <label htmlFor="firstName">Name</label>
                <input type="text" id="firstName" placeholder="First Name" name="firstName" value={firstName} onChange={this.handleChange} />

                <label htmlFor="lastName">Name</label>
                <input type="text" id="lastName" placeholder="Last Name" name="lastName" value={lastName} onChange={this.handleChange} />

                <label htmlFor="email">Name</label>
                <input type="text" id="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} />

                <label htmlFor="phone">Name</label>
                <input type="text" id="phone" placeholder="Phone" name="phone" value={phone} onChange={this.handleChange} />

                <textarea value={address} onChange={this.handleChange} name="address" />

                <button>Send</button>
                <Link to="/users">Cancel</Link>
            </form>
        )
    }
}

export default Form;