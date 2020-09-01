import React from "react";
import { Input, Menu } from 'antd';
import "./AppLayout.scss";
import LogoImage from "assets/logo.png"
import { useHistory } from "react-router-dom";
import StoryList from "components/StoryList";
import SuggestionList from "components/SuggestionList";
import { Button } from 'antd'






function AppLayout({ children }) {
    const history = useHistory();

    const handleClick = () => {
        history.push("/posts/new");

    }

    const sidebar = (
        <>
            <Button type="primary" block style={{ marginBottom: "1rem" }} onClick={handleClick}>New Post</Button>
            <StoryList style={{ marginBottom: "1rem" }} />
            <SuggestionList />
        </>
    );

    const goHome = () => {
        history.push("/");
    }


    const goSignup = () => {
        history.push("/accounts/signup");
    }
    const goLogin = () => {
        history.push("/accounts/login");
    }

    return (
        <div className="app">
            <div className="header" >
                <div className="page-title" ><div onClick={goHome} style={{ cursor: 'pointer' }}><img src={LogoImage} alt="logo" /></div></div>
                <div className="search"><Input.Search /></div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item onClick={goSignup}>SignUp</Menu.Item>
                        <Menu.Item onClick={goLogin}>Log In</Menu.Item>
                    </Menu>
                </div>
            </div>

            <div className="contents">{children}</div>
            <div className="sidebar" >
                {sidebar}

            </div>
            <div className="footer">&copy;  2020</div>

        </div>
    );
}

export default AppLayout;