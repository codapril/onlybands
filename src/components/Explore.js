import React, { Component } from "react";
import { Card, CardGroup } from "react-bootstrap";
import Layout from "./Layout";
import bandData from "../data"


function getBandCards(props) {
    const bandCards = []
    Object.entries(bandData).forEach(([bandId, value]) =>{
        let path = `bands/${bandId}`

        bandCards.push(
            <Card props={props}>
                <Card.Title><h3>{value.name}</h3></Card.Title>
                <Card.Text>{value.infoText}</Card.Text>
                <Card.Link href={path}>Explore</Card.Link>
            </Card>
        )
    })
        
    return bandCards
}


class Explore extends Component {
    render() {

        return (
            <div>
                <Layout>
                    <CardGroup>
                        {getBandCards(this.props)}     
                    </CardGroup>
                </Layout>
            </div>
            
        )
    }
}

export default Explore;