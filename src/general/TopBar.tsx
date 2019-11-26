import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIceCream } from '@fortawesome/free-solid-svg-icons'

const Bar = styled.div`
    background: #222;
    width: 100%;

    padding: 20px 0;
`

const Wrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;

    margin: auto;
    color: #eee
`

const RestyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`

const Logo = styled.h2`
    margin: 0;
`

const Button = styled.button`
    height: 30px;

    border-radius: 5px;

    margin: 3px;
    color: black;
    cursor: pointer;
`

type Props = {
    link?: {
        to: string,
        text: string
    }
}

export class TopBar extends React.Component<Props> {
    render() {
        const { link } = this.props;
        return (
            <Bar>
                <Wrapper>
                    <Logo>
                        <RestyledLink to="/"><FontAwesomeIcon icon={faIceCream} />  Echo</RestyledLink>
                        {this.props.children}
                    </Logo>
                    {link ?
                        <RestyledLink to={link.to}>
                            <Button type="button">
                                {link.text}
                            </Button>
                        </RestyledLink>
                        : null}
                </Wrapper>
            </Bar>
        )
    }
}


export default TopBar;