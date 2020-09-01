import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card, Form, Input, Button, notification } from 'antd';
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { axiosInstance } from "api";
import { useAppContext } from "store";
import { setToken } from 'store';
import { parseErrorMessages } from 'utils/forms';

import AppLayout from '../../components/AppLayout';

function Login() {
    const { store, dispatch } = useAppContext();
    const location = useLocation();
    const history = useHistory();
    //const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
    const [fieldErrors, setFieldErrors] = useState({});

    const { from: loginRedirectUrl } = location.state || { from: { pathname: "/" } };

    const onFinish = values => {

        async function fn() {

            const { username, password } = values;

            setFieldErrors({});

            const data = { username, password };
            try {
                const response = await axiosInstance.post("/accounts/token/", data);

                const { data: { token: jwtToken } } = response;

                dispatch(setToken(jwtToken));

                notification.open({
                    message: `어서오세요 ${username}`,
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                });
                history.push(loginRedirectUrl);
            } catch (error) {
                if (error.response) {
                    notification.open({
                        message: "로그인 실패",
                        description: "아이디/암호를 확인해주세요.",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />
                    });

                    const { data: fieldsErrorMessages } = error.response;
                    //python에서 dict.items()
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }
        fn();
    };


    return (

        <Card title="로그인" {...cardLayout}>
            <Form
                {...layout}
                onFinish={onFinish}
                //onFinishFailed={onFinishFailed}
                autoComplete={"false"}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: "Please input your username!" },
                        { min: 5, message: "5글자 입력해주세요." }
                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                    {...fieldErrors.non_field_errors}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                    {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>



                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Login
        </Button>
                </Form.Item>
            </Form>
        </Card>

    );
}

const cardLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 2 }
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};



export default Login;