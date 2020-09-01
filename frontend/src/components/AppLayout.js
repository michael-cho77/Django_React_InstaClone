import React from "react";
import { Input, Menu } from 'antd';
import "./AppLayout.scss";
import LogoImage from "assets/logo.png"
import { useHistory } from "react-router-dom";

function AppLayout({ children, sidebar }) {
    const history = useHistory();
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