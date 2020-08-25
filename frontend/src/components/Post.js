import React from 'react';
import { HeartOutlined, HeartTwoTone, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Comment, Tooltip } from "antd";
import { useAppContext } from 'store';
import CommentList from "./CommentList";

function Post({ post, handleLike }) {
    const { author, caption, location, photo, tag_set, is_like } = post;
    const { username, name, avatar_url } = author;


    return (
        <div className="post">
            <Card hoverable cover={<img src={photo} alt={caption} />}
                actions={[
                    is_like ? (
                        <HeartTwoTone
                            twoToneColor="#eb2f96"
                            onClick={() => handleLike({ post, isLike: false })}
                        />
                    ) : (
                            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
                        )
                ]}
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

            <CommentList post={post} />
        </div>
    );


}

export default Post;