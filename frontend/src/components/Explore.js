import React from "react";
import { Card, CardGroup } from "react-bootstrap";


function BandCard({band}) {
    let path = `bands/${band._id}`
    return(
        <Card>
            <Card.Title><h3>{band.name}</h3></Card.Title>
            <Card.Text>{band.infoText}</Card.Text>
            <Card.Link href={path}>Explore</Card.Link>
        </Card>
    )
}


function Explore({ bands }) {
    return (
      <div>
        <CardGroup>
            {bands.map((band) => (
            <BandCard key={band._id} band={band} />
            ))}
        </CardGroup>
      </div>
    );
  }

export default Explore;