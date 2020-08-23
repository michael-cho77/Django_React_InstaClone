import React, { useEffect, useState } from 'react';
import Post from './Post';
import Axios from "axios";
import { useAppContext } from 'store';

const apiURL = "http://127.0.0.1:8000/api/posts/"

function PostList() {
    const { store: { jwtToken }, dispatch } = useAppContext();
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        Axios.get(apiURL)
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
            {postList.map(post => <Post post={post} key={post.id} />)}
        </div>
    );

}


export default PostList;