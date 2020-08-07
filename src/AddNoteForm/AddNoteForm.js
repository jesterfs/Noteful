import React, { Component } from 'react'
import ApiContext from '../ApiContext.js'

export default class AddNote extends Component {
  static contextType = ApiContext;

  const newNote = {
    'name': event.target.title.value,
    'modified': new Date(),
    'folderId': event.target.selectFolder.value,
    'content': event.target.content.value
  }

  addNoteToApi(id) {
    fetch(`http://localhost:9090/notes/${id}`, {method: 'POST'}).then(
      r => {
        if (r.ok)
          return r.json();

        throw new Error(r);
      }
    ).then(
      () => this.context.addNote(id)
    );
  }

  render () {
    return (
      <form className="addNote">
        <div className="form-group">
          <label htmlFor="noteTitle">Note Title</label>
          <input type="text" className="noteTitle"
            name="noteTitle" id="noteTitle"/>
        </div>
        <div className="form-group">
            <label htmlFor="content">Content</label>
            <input type="text" className="content"
            name="content" id="content"/>
        </div>
        <div className="form-group">
          <label htmlFor="selectFolder">Folder</label>
          <select name="selectFolder" id="selectFolder" form="selectFolder">
            {this.context.folders.map(folder =>
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
              )}
          </select>
        </div>

        <div className="addNoteButtons">
          <button type="reset" className="addNoteCancel">
              Cancel
          </button>
          <button type="submit" className="addNoteSave" onClick={() => this.removeNote()}>
              Save
          </button>
        </div>
      </form>
    )
  }
}
