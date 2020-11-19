

import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import AddNoteForm from "../AddNoteForm/AddNoteForm";
import AddFolderForm from "../AddFolderForm/AddFolderForm";
import NoteError from "../NoteError";
import cfg from '../config';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        // fake date loading from API call
        // setTimeout(() => this.setState(dummyStore), 600);
        fetch(`${cfg.API_ENDPOINT}api/folders` )
          .then(r => r.json())
          .then(rjson=> this.setState({folders: rjson }))

        fetch(`${cfg.API_ENDPOINT}api/notes` )
          .then(r => r.json())
          .then(rjson => this.setState({notes: rjson }))
    }
    

    handleDeleteNote = noteId => {
        console.log(noteId, this.state.notes)
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
            
        });
    };

    handleAddNote = (note) => {
      this.setState({notes: [...this.state.notes, note] })
    }

    handleAddFolder = (folder) => {
        this.setState({folders: [...this.state.folders, folder]})
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-note" component={AddNoteForm} />
                <Route path="/add-folder" component={AddFolderForm} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addNote: this.handleAddNote, 
            addFolder: this.handleAddFolder
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
