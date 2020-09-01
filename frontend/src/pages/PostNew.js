import React from 'react';
import PostNewForm from 'components/PostNewForm';
import "./PostNew.scss";
import { Card } from 'antd';



export default function PostNew() {
    return (
        <div className="PostNew">
            <Card title="새 포스팅 쓰기" style={{ width: '87%' }}>
                <PostNewForm />
            </Card>
        </div>

    )


}
