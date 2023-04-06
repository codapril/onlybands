import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";


function BandPage( {bands} ) {

    const [likes, setLikes] = useState(0);
    const { id } = useParams()

    const band = bands.find(band => band._id.toString() === id);


    const handleLike = () => {
       fetch(`${process.env.REACT_APP_SERVER_URL}/likes/${id}`, {method: "POST"})
        .then(setLikes((prevLikes) => prevLikes + 1))
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/bands/${id}`)
            .then(response => response.json())
            .then(data => {
                setLikes(data.likes)
            })
            .catch((error) => console.log(error));
    }, [id])



    if (!band) {
        return <div>Band not found</div>
    } else {

        return (
            <div>
                <h3>{band.name} page</h3>
                <p>{band.infoText}</p>
                <ButtonGroup>
                    <Button onClick={handleLike}>Like</Button>
                </ButtonGroup>
                <p>Likes: {likes}</p>
            </div>

        )
    }
}

export default BandPage;