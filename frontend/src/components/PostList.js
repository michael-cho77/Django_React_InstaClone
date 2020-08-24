import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import Post from './Post';
import Axios from "axios";
import { useAppContext } from 'store';

const apiURL = "http://127.0.0.1:8000/api/posts/"

function PostList() {
    const { store: { jwtToken }, dispatch } = useAppContext();
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        const headers = { Authorization: `JWT ${jwtToken}` };
        Axios.get(apiURL, { headers })
            .then(response => {
                const { data } = response;
                console.log("loaded response :", response);
                setPostList(data);
            })
            .catch(error => {
                console.log(error.response);
            });
        console.log("mounted");
    }, []);
    return (
        <div>
            {postList.length === 0 && (
                <Alert type='warning' message='포스팅이 없습니다.' />
            )}
            {postList.map(post => <Post post={post} key={post.id} />)}
        </div>
    );

}


export default PostList;