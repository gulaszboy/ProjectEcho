import React from 'react';
import { Link } from 'react-router-dom';

interface FormState {
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    [key: string]: any
}

export class Form extends React.Component<{}, FormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value });
    };

    render() {
        const { email, firstName, lastName, phone } = this.state;

        return (
            <>
                <label htmlFor="firstName">Name</label>
                <input type="text" id="firstName" placeholder="First Name" name="firstName" value={firstName} onChange={this.handleChange} />

                <label htmlFor="lastName">Name</label>
                <input type="text" id="lastName" placeholder="Last Name" name="lastName" value={lastName} onChange={this.handleChange} />

                <label htmlFor="email">Name</label>
                <input type="text" id="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} />

                <label htmlFor="phone">Name</label>
                <input type="text" id="phone" placeholder="Phone" name="phone" value={phone} onChange={this.handleChange} />

                <button>Send</button>
                <Link to="/users">Cancel</Link>
            </>
        )
    }
}

export default Form;