import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import { Navbar, Button, Container, Row, Col, Form, ListGroup } from 'react-bootstrap';
import logo from './logo.png';

const API_URL = process.env.REACT_APP_API_URL + "Notes";

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      note: { id: 0, title: "", content: "" }
    };
    this.handleChange = this.handleChange.bind(this);
    this.openNote = this.openNote.bind(this);
    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }

  componentDidMount() {
    axios.get(API_URL)
      .then((response) => {
        this.setState({ notes: response.data });
        if (response.data.length > 0)
          this.openNote(response.data[0]);
      });
  }

  createNote() {
    let newNote = { title: "New Note", content: "" };
    axios.post(API_URL, newNote)
      .then((response) => {
        this.setState(state => ({ notes: [response.data, ...state.notes] }));
        this.openNote(response.data);
      });
  }

  deleteNote() {
    const id = this.state.note.id;
    if (id == 0) return;

    axios.delete(API_URL + "/" + id)
      .then((response) => {
        this.setState(state => ({
          notes: state.notes.filter(x => x.id != id),
          note: { id: 0, title: "", content: "" }
        }));
      });
  }

  saveNote(event) {
    event.preventDefault();
    const id = this.state.note.id;
    if (id == 0) return;

    axios.put(API_URL + "/" + id, this.state.note)
    .then((response) => {
      let index = this.state.notes.findIndex(x => x.id == id);
      let notes = [...this.state.notes];
      notes[index] = response.data;
      this.setState({ notes });
      this.openNote(response.data);
    });
  }

  handleChange(event) {
    this.setState({
      note: {
        ...this.state.note,
        [event.target.name]: event.target.value
      }
    });
  }

  openNote(note, event) {
    event?.preventDefault();
    this.setState({ note: { ...note } });
  }

  render() {
    const title = this.state.note.title;
    const content = this.state.note.content;

    return (
      <div className="App h-100 d-flex flex-column">
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#">
              <img src={logo} alt="Logo" height={30} />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container fluid className="flex-fill">
          <Row className="h-100">
            <Col className="py-3 bg-light" sm="4" md="3" lg="2">
              <Button className="mb-2" onClick={this.createNote}>New Note</Button>
              <ListGroup>
                {this.state.notes.map((x, i) =>
                  <ListGroup.Item key={i} active={x.id == this.state.note.id} action href="#" onClick={(e) => this.openNote(x, e)}>
                    {x.title}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
            <Col className="py-3" sm="8" md="9" lg="10">
              {
                this.state.note.id == 0
                  ?
                  <div className="fs-3 h-100 d-flex align-items-center justify-content-center">
                    {this.state.notes == 0 
                      ? "You haven't created a note yet!"
                      : "Select a note to read or edit."
                    }
                  </div>
                  :
                  <Form className="h-100 d-flex flex-column" onSubmit={this.saveNote}>
                    <Form.Group className="mb-2">
                      <Form.Control name="title" value={title} onChange={this.handleChange} type="text" placeholder="title" required />
                    </Form.Group>
                    <Form.Group className="mb-2 flex-fill">
                      <Form.Control className="h-100" as="textarea" name="content" value={content} onChange={this.handleChange} cols="30" rows="10" placeholder="write something.." />
                    </Form.Group>
                    <div>
                      <Button type="submit" variant="primary" className="me-2">Save</Button>
                      <Button variant="danger" onClick={this.deleteNote}>Delete</Button>
                    </div>
                  </Form>
              }
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;
