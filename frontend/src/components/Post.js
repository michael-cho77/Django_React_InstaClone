import React from 'react';
import { HeartOutLined, HeartFilled, UserOutlined } from "@ant-design/icons";
import { Card, Avatar } from 'antd';

function Post({ post }) {
    const { caption, location, photo } = post;
    return (
        <div className="post">
            <Card hoverable cover={<img src={photo} alt={caption} />}
                actions={[<HeartFilled />]}
            >
                <Card.Meta
                    avatar={<Avatar size="large" icon={<UserOutlined />} />}
                    title={location}
                    description={caption}
                />
            </Card>
        </div>
    );


}

export default Post;