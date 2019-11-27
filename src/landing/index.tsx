import React from 'react';
import TopBar from '../general/TopBar';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    width: 80%;
    margin: auto;
    background: #eee;
    display: flex;
    flex-direction:column;
    justify-content: space-between;

    height: 50vh;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    text-align: center;
`

const Block = styled.div`
    width: 45%;
    font-size: 40px;
    margin: 10px;
    background: #ddd;

    height: calc(100% - 20px);
    border-radius: 10px;

    cursor: pointer;

    transition: all 0.5s;

    &:hover {
        background: #ccc;
    }
`

const BlockWrap = styled.div`
    display: flex;
    height: 50vh;
    justify-content: center

`

const RestyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center
`

class Landing extends React.Component {
    render() {
        return (
            <>
                <TopBar />

                <Wrapper>
                    <h1>Welcome! What youre looking for?</h1>
                    <BlockWrap>
                        <Block>
                            <RestyledLink to="/users">
                                <strong>Users</strong>
                            </RestyledLink>
                        </Block>
                        <Block>
                            <RestyledLink to="/posts">
                                <strong>Posts</strong>
                            </RestyledLink>
                        </Block>
                    </BlockWrap>

                </Wrapper>
            </>
        )
    }

}

export default Landing;