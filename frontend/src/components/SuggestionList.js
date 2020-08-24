import React, { useState, useEffect, useMemo } from "react";
import { Card } from "antd";
import Suggestion from "./Suggestion";
import "./SuggestionList.scss";
import Axios from 'axios';
import useAxios from 'axios-hooks';
import { useAppContext } from "store";

export default function SuggestionList({ style }) {
    const {
        store: { jwtToken }
    } = useAppContext();

    const [userList, setUserList] = useState([]);

    const headers = { AUthorization: `JWT ${jwtToken}` };


    const [{ data: originUserList, loading, error }, refetch] = useAxios({
        url: "http://localhost:8000/accounts/suggestions/",
        headers
    });

    useEffect(() => {
        if (!originUserList)
            setUserList([]);
        else
            setUserList(originUserList.map(user => ({ ...user, is_follow: false })));
    }, [originUserList]);

    const onFollowUser = (username) => {
        const data = { username };
        const config = { headers };
        Axios.post("http://localhost:8000/accounts/follow/", data, config)
            .then(response => {
                setUserList(prevUserList =>
                    prevUserList.map(user =>
                        user.username !== username ? user : { ...user, is_follow: true }
                    )
                );

            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div style={style} >
            {loading &&
                <div> Loading ... </div>}
            {error && <div> 로딩중 에러가 발생했습니다. </div>}

            <button onClick={() => refetch()}>Reload</button>

            <Card title="Suggestions for you " size="small">
                {userList.map(suggestionUser => (
                    <Suggestion
                        key={suggestionUser.username}
                        suggestionUser={suggestionUser}
                        onFollowUser={onFollowUser}

                    />
                ))}
            </Card>
        </div>
    )
}