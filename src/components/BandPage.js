import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";


function BandPage( {bands} ) {

    const [likes, setLikes] = useState(0);
    const { id } = useParams()

    const band = bands.find(band => band._id.toString() === id);


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
    }, [id]);

   

    if (!band) {
        return <div>Band not found</div>
    } else {

        return (
            <div>
                <h3>{band.name} page</h3>
                <p>{band.infoText}</p>
                <ButtonGroup>
                    <Button onClick={increaseLikes}>Like</Button>
                </ButtonGroup>
                <p>Likes: {likes}</p>
            </div>

        )
    }
}

export default BandPage;