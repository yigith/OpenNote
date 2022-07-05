import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import { Navbar, Button, Container, Row, Col, Form, ListGroup, Offcanvas } from 'react-bootstrap';
import logo from './logo.png';
import Loading from './Loading';

const API_URL = process.env.REACT_APP_API_URL + "Notes";

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      note: { id: 0, title: "", content: "" },
      showCanvas: false,
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.openNote = this.openNote.bind(this);
    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }

  showLoading() {
    this.setState({ isLoading: true });
  }

  hideLoading() {
    this.setState({ isLoading: false });
  }

  componentDidMount() {
    this.showLoading();
    axios.get(API_URL)
      .then((response) => {
        this.hideLoading();
        this.setState({ notes: response.data });
        if (response.data.length > 0)
          this.openNote(response.data[0]);
      });
  }

  createNote() {
    let newNote = { title: "New Note", content: "" };
    this.showLoading();
    axios.post(API_URL, newNote)
      .then((response) => {
        this.hideLoading();
        this.setState(state => ({ notes: [response.data, ...state.notes] }));
        this.openNote(response.data);
      });
  }

  deleteNote() {
    const id = this.state.note.id;
    if (id == 0) return;

    this.showLoading();
    axios.delete(API_URL + "/" + id)
      .then((response) => {
        this.hideLoading();
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

    this.showLoading();
    axios.put(API_URL + "/" + id, this.state.note)
      .then((response) => {
        this.hideLoading();
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
    this.setState({ note: { ...note }, showCanvas: false });
  }

  render() {
    const title = this.state.note.title;
    const content = this.state.note.content;

    const sidebarContent = <>
      <Button className="mb-2" onClick={this.createNote}>New Note</Button>
      <ListGroup>
        {this.state.notes.map((x, i) =>
          <ListGroup.Item title={lastModifiedText(x.modifiedTime)} key={i} active={x.id == this.state.note.id} action href="#" onClick={(e) => this.openNote(x, e)}>
            {x.title}
          </ListGroup.Item>
        )}
      </ListGroup>
    </>;

    return (
      <div className="App h-100 d-flex flex-column">
        <Loading show={this.state.isLoading} />
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Button className="d-sm-none" variant="dark" onClick={() => this.setState({ showCanvas: true })}>
              <span className="navbar-toggler-icon"></span>
            </Button>
            <Navbar.Brand href="#">
              <img src={logo} alt="Logo" height={30} />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container fluid className="flex-fill">
          <Row className="h-100">
            <Col className="h-100 bg-light d-none d-sm-block position-relative" sm="4" md="3" lg="2">
              <div className="sidebar-content-container p-3">
                {sidebarContent}
              </div>
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
        <Offcanvas show={this.state.showCanvas} onHide={() => this.setState({ showCanvas: false })}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>OpenNote</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {sidebarContent}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    )
  }
}

function lastModifiedText(isoTime) {
  return "Last modified: " + new Date(isoTime).toLocaleString();
}

export default App;
