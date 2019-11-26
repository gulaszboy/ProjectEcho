import React from 'react';
import { User } from '.';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faInfo } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components';
import TopBar from '../general/TopBar';

const Wrapper = styled.div`
    width: 60%;

    padding: 15px 40px;

    background: #eee;
    margin: 10px auto;
    border-radius: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center
`

const Button = styled.button`
    width:30px;
    height: 30px;

    border-radius: 5px;

    margin: 3px;
    color: black;
    cursor: pointer
`

const RestyledLink = styled(Link)`
    color: black;
    text-decoration: none;
`

const UserData = styled.div`
    font-size: 20px
`

type Props = {
    users: Array<User>,
    updateUserList: (users: Array<User>) => void,
}

export class UserList extends React.Component<Props> {
    constructor(props: Props) {
        super(props)

        this.deleteUser = this.deleteUser.bind(this);
    }


    deleteUser(id: string) {
        const { updateUserList } = this.props;

        fetch(`http://localhost:8081/api/users/${id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(resp => updateUserList(resp.users))
    }

    render() {
        const { users } = this.props;

        const size = 10;
        const list = users.filter((u, i) => i < size).map(user =>
            <Wrapper
                key={user._id}
            >
                <UserData>{user.firstName} {user.lastName} ( {user.email} )</UserData>
                <div>
                    <RestyledLink to={`/users/${user._id}`}>
                        <Button type="button">

                            <FontAwesomeIcon icon={faInfo} />

                        </Button>
                    </RestyledLink>
                    <RestyledLink to={`/users/${user._id}/edit`}>
                        <Button type="button">
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </RestyledLink>
                    <Button type="button" onClick={() => this.deleteUser(user._id)}>
                        <b>x</b>
                    </Button>
                </div>

            </Wrapper>
        )

        return (
            <>
                <TopBar link={{ to: "users/new", text: "New user" }}> | Users </TopBar>
                {list}
            </>
        )
    }
}

export default UserList;