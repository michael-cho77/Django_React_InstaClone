import React from 'react';
import { Alert } from 'antd';
import Post from './Post';
import useAxios from "axios-hooks";
import Axios from "axios";
import { useAppContext } from 'store';

const apiURL = "http://127.0.0.1:8000/api/posts/"

function PostList() {
    const { store: { jwtToken } } = useAppContext();


    const headers = { AUthorization: `JWT ${jwtToken}` };


    const [{ data: postList, loading, error }, refetch] = useAxios({
        url: "http://localhost:8000/api/posts/",
        headers
    });



    return (
        <div>
            {postList && postList.length === 0 && (
                <Alert type='warning' message='포스팅이 없습니다.' />
            )}
            {postList && postList.map(post => <Post post={post} key={post.id} />)}
        </div>
    );

}


export default PostList;