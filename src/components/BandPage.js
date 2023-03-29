import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";

import Layout from "./Layout";
import bandData from "../data"


function BandPage() {

    const [likes, setLikes] = useState(0);

    const increaseLikes = () => {
        setLikes(prevCount => {
          const newLikes = Number(prevCount) + 1;
          localStorage.setItem(`likes-${id}`, newLikes);
          return newLikes;
        });
    };

    useEffect(() => {
        const initLikes = localStorage.getItem(`likes-${id}`);
        if (initLikes) setLikes(initLikes);
    }, []);

    const { id } = useParams()
    const name = bandData[id].name
    const infoText = bandData[id].infoText
    const twitter = bandData[id].twitter

    return (
        <div>
            <Layout>
                <h3>{name} page</h3>
                <p>{infoText}</p>
                <ButtonGroup>
                    <Button onClick={increaseLikes}>Like</Button>
                    <Button href={twitter}>Twitter</Button>
                </ButtonGroup>
                <p>Likes: {likes}</p>
                
            </Layout>
        </div>

    )
}

export default BandPage;