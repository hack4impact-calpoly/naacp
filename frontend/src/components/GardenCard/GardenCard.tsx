import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function GardenCard() {
  return (
    <body>
      <Card className="gardenCard">
        <Container>
          <Row>
            <Col>
              <Card.Img
                className="card-img-top object-cover h-30 w-30"
                variant="top"
                src={require("./garden.jpg")}
              />
            </Col>
            <Col>
              <Card.Title>City Garden</Card.Title>
              <Card.Subtitle>1 Grand Avenue</Card.Subtitle>
              <Card.Subtitle>San Luis Obispo,</Card.Subtitle>
              <Card.Subtitle>California 93405</Card.Subtitle>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </Card>
    </body>
  );
}
