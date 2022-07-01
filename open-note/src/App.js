import './App.css';
import axios from 'axios';

import React, { Component } from 'react'

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      notes: [], 
      note: { id: 0, title: "", content: "" } 
    };
    this.handleChange = this.handleChange.bind(this);
    this.openNote = this.openNote.bind(this);
  }

  componentDidMount() {
    axios.get("https://localhost:7096/api/Notes")
      .then((response) => {
        this.setState({ notes: response.data });
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

  openNote(note) {
    this.setState({note: { ...note }});
  }

  render() {
    const title = this.state.note.title;
    const content = this.state.note.content;

    return (
      <div className="App">
        <div className="App-row">
          <div className="App-col1">
            <h1>Notes</h1>
            <ul>
              {this.state.notes.map((x, i) =>
                <li key={i} style={{ backgroundColor: x.id == this.state.note.id ? "red" : "inherit"}}>
                  <a href="#" onClick={() => this.openNote(x)}>{x.title}</a>
                </li>
              )}
            </ul>
          </div>
          <div className="App-col2">
            <div>
              <input name="title" value={title} onChange={this.handleChange} type="text" placeholder="title" />
            </div>
            <div>
              <textarea name="content" value={content} onChange={this.handleChange} id="" cols="30" rows="10" placeholder="write something.."></textarea>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
