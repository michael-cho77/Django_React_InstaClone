import React, { useEffect, useState } from 'react';
import Post from 'Post';
import Axios from "axios";

const apiURL = "http://127.0.0.1:8000/api/posts/"

function PostList() {
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
            <h1>PostList</h1>
            {postList.map(post => <Post post={post} key={post.id} />)}
        </div>
    );

}


export default PostList;