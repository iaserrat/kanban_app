import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {id: uuid.v4(), task:'A'},
        {id: uuid.v4(), task:'B'},
        {id: uuid.v4(), task:'C'},
        {id: uuid.v4(), task:'D'},
      ]
    }
  }

  /**
   * Property initializers [ES7]
   */
  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: Math.random().toString(36).substring(7)
      }])
    });
  }

  editNote = (id, task) => {
    const notes = this.state.notes.map((note) => {
      if (note.id === id) {
        note.task = task;
      }
      return note;
    });
    this.setState({notes});
  }

  deleteNote = (id) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== id)
    });
  }

  render() {
    const notes = this.state.notes;
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote}/>
      </div>
    );
  }
}
