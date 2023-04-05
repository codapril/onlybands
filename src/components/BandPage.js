import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";


function BandPage( {bands} ) {

    const [likes, setLikes] = useState(0);
    const { id } = useParams()

    const band = bands.find(band => band._id.toString() === id);


    const handleLike = async () => {
        const response = await fetch(`http://localhost:5000/likes/${id}`, {
            method: "POST",
        });

        if (response.ok) {
            setLikes((prevLikes) => prevLikes + 1);
        } else {
            console.error("Error updating like", response.statusText);
        }
        
    };

    useEffect(() => {
        fetch(`http://localhost:5000/bands/${id}`)
            .then((response) => response.json)
            .then(data => {
                console.log(data) // TODO
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