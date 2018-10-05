import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Project from './Project.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:9000/api/projects')
      .then((response) => {
        this.setState(() => ({ projects: response.data }));
      })
      .catch((error) => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.projects.map((project) => (
          <Project project={project} key={project.id} />
        ))}
      </div>
    );
  }
}

export default App;
