import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Form, Input, Button, notification } from 'antd';
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { axiosInstance } from "api";

export default function Signup() {
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = values => {

        async function fn() {
            console.log(values);
            const { username, password, first_name, last_name, email } = values;

            setFieldErrors({});

            const data = { username, password, first_name, last_name, email };
            try {
                await axiosInstance.post("/accounts/signup/", data);

                notification.open({
                    message: "회원가입 성공",
                    description: "로그인 페이지로 이동합니다.",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                });
                history.push("/accounts/login");
            } catch (error) {
                if (error.response) {
                    notification.open({
                        message: "회원가입 실패",
                        description: "아이디/암호를 확인해주세요.",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />
                    });

                    const { data: fieldsErrorMessages } = error.response;
                    //python에서 dict.items()
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce((acc, [fieldName, errors]) => {
                            // errors : ["m1", "m2"].join(" ") => "m1 m2"
                            acc[fieldName] = {
                                validateStatus: "error",
                                help: errors.join(" ")
                            };
                            return acc;
                        }, {})
                    );
                }
            }
        }
        fn();
    };


    return (
        <Card title="회원가입" {...cardLayout} >
            <Form
                {...layout}
                onFinish={onFinish}
                //onFinishFailed={onFinishFailed}
                autoComplete={"false"}
                style={{ marginTop: "5.5rem" }}
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

                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[{ required: true, message: "Please input your First_name!" }]}
                    {...fieldErrors.first_name}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[{ required: true, message: "Please input your Last_name!" }]}
                    {...fieldErrors.last_name}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="E-Mail"
                    name="email"
                    rules={[{ required: true, message: "Please input your E-mail!" }]}
                    {...fieldErrors.email}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
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