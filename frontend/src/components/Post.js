import React from 'react';
import { HeartOutLined, HeartFilled, UserOutlined } from "@ant-design/icons";
import { Card, Avatar } from 'antd';

function Post({ post }) {
    const { author, caption, location, photo, tag_set, like_user_set } = post;
    const { username, name, avatar_url } = author;
    return (
        <div className="post">
            <Card hoverable cover={<img src={photo} alt={caption} />}
                actions={[<HeartFilled />]}
            >
                <Card.Meta
                    avatar={
                        <Avatar
                            size="large"
                            icon={
                                <img src={`http://localhost:8000` + avatar_url} alt={username} />}
                        />
                    }
                    title={location}
                    description={caption}
                />
            </Card>
        </div>
    );


}

export default Post;