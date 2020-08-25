import React from 'react';
import PostList from 'components/PostList';
import AppLayout from 'components/AppLayout';
import StoryList from "components/StoryList";
import SuggestionList from "components/SuggestionList";
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory();
    const handleClick = () => {
        history.push("/posts/new");

    }

    const sidebar = (
        <>
            <Button type="primary" block style={{ marginBottom: "1rem" }} onClick={handleClick}>New Post</Button>
            <StoryList style={{ marginBottom: "1rem" }} />
            <SuggestionList />
        </>
    );
    return (
        <AppLayout children={<PostList />} sidebar={sidebar} >

        </AppLayout>
    );
}


export default Home;