import React, { Component } from "react";
import "./App.css";
import { Table } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Card, CardBody, CardTitle, CardImg } from "reactstrap";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feelings: [],
      modal: false,
      id: "",
      desc: "",
      imgUrl: "",
      descActual: "",
      imgUrlActual: "https://i.ibb.co/YB6BkyZ/raccoonthinking.jpg"
    };
    this.toggle = this.toggle.bind(this);

  }

  componentWillMount() {
    axios
      .get("http://54.196.43.91:3000/raccoon/feelings")
      .then(res => {
        this.setState({
          feelings: res.data.feelings
        });
      })
      .catch(err => console.log(err));
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  detailFeeling(id, desc, imgUrl) {
    this.toggle();
    this.setState({
      id: id,
      desc: desc,
      imgUrl: imgUrl
    });
  }

  actualFeelingTable(desc, imgUrl) {
    this.setState({
      descActual: desc,
      imgUrlActual: imgUrl
    });
  }

  actualFeelingModal(descActual, imgUrlActual) {
    this.setState({
      descActual: descActual,
      imgUrlActual: imgUrlActual
    });
    this.toggle();
  }

  render() {
    let feelings = this.state.feelings.map(feeling => {
      return (
        <tr key={feeling.id}>
          <th scope="row">{feeling.id}</th>
          <td>{feeling.desc}</td>
          <td
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center"
            }}
          >
            <Button
              color="danger"
              size="lg"
              onClick={this.detailFeeling.bind(
                this,
                feeling.id,
                feeling.desc,
                feeling.imgUrl
              )}
            >
              Detalle
            </Button>
            {""}
            <Button
              color="danger"
              size="lg"
              style={{ marginLeft: "2vw" }}
              onClick={this.actualFeelingTable.bind(
                this,
                feeling.desc,
                feeling.imgUrl
              )}
            >
              Elegir
            </Button>
          </td>
        </tr>
      );
    });

    const externalCloseBtn = (
      <button
        className="close"
        style={{ position: "absolute", top: "15px", right: "15px" }}
        onClick={this.toggle}
      >
        &times;
      </button>
    );

    return (
      <Container className="App Container">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            {" "}
            <img
              src="https://i.ibb.co/b337QmN/Screenshot-from-2019-02-08-23-04-40.png"
              alt="raccoon"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <h1>¿En la escala del Raccoon, como te sientes hoy?</h1>
            <Card>
              <CardImg
                top
                width="100%"
                src={this.state.imgUrlActual}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>{this.state.descActual} </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Me siento</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>{feelings}</tbody>
            </Table>
          </Col>
        </Row>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          external={externalCloseBtn}
        >
          <ModalHeader style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={this.state.imgUrl}
              alt={this.state.desc}
              style={{ width: "100%", margin: "0" }}
            />
          </ModalHeader>
          <ModalBody>{this.state.desc}</ModalBody>
          <ModalFooter>
            <Button outline color="danger" onClick={this.toggle}>
              Cerrar
            </Button>{" "}
            <Button color="danger" onClick={this.actualFeelingModal.bind(
                this,
                this.state.desc,
                this.state.imgUrl
              )}>
              Justo así
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default App;
