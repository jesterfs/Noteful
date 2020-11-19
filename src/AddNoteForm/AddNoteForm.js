import React, { Component } from 'react'
import ApiContext from '../ApiContext.js'
import NoteError from "../NoteError";
import cfg from "../config"
import './AddNoteForm.css'

export default class AddNote extends Component {
  state= {
    titleError: null,
    contentError: null
  }
  static contextType = ApiContext;



  addNoteToApi(note) {
    fetch(`${cfg.API_ENDPOINT}api/notes`, 
    {method: 'POST', 
    body: JSON.stringify(note),
    headers: {
      'content-type' : 'application/json'
    }
  })
    .then(
      r => {
        if (r.ok)
          return r.json();

        throw new Error(r);
      }
    ).then(
      ({id}) => { 
        this.context.addNote({...note, id})
        this.props.history.push(`/note/${id}`)
    }
    ).catch(error => alert('Something went wrong. Please check your connection and try again.'))
  }

  formCanceled = e => {
    e.preventDefault()
    this.props.history.push(`/`)
  }

  formSubmitted = e => { 
    e.preventDefault()
    
    // console.log(e.currentTarget.noteTitle.value)
    
    // const name = e.currentTarget.noteTitle.value 
    // console.log(name)
    // const content = e.currentTarget.content.value

    // if ([this.validateTitleValue(name), this.validateContentValue(content)].filter(Boolean).length) return;

    const note = {
      name: e.currentTarget.noteTitle.value ,
      content:  e.currentTarget.content.value, 
      folder_id: this.folderRef.current.value,
      modified: new Date()
    }
    console.log(note)
    this.addNoteToApi(note)
  }
   
  folderRef = React.createRef()

  

  validateTitleValue = title => {
    if (title.length === 0) {
      const titleError = 'Please add a title';
      this.setState({ titleError });
      return titleError;
    } else {
      this.setState({ titleError: false });
      return false;
    }
  }

  validateTitle = (e) => this.validateTitleValue(e.currentTarget.value)


  validateContentValue = content => {
    if (content.length === 0) {
      const contentError = 'Please add content';
      this.setState({ contentError });
      return contentError;
    } else {
      this.setState({ contentError: false });
      return false;
    }
  }

  validateContent = (e) => this.validateContentValue(e.currentTarget.value)




 

  

  render () {

    const { titleError, contentError } = this.state;

    return (
      <div className="noteDiv">
        <NoteError>
          <h2>Add A Note</h2>
          <form className="addNote" onSubmit={this.formSubmitted}>
            <div className="form-group">
              <label htmlFor="noteTitle">Note Title</label>
              <input type="text" className="noteTitle"
                name="noteTitle" id="noteTitle" onChange={this.validateTitle} onBlur={this.validateTitle} required/>
                
            </div>
            <div className='error'>
              {titleError && <p>{titleError}</p>}
            </div>
            

            <div className="form-group">
              <label htmlFor="selectFolder">Folder</label>
              <select ref={this.folderRef} name="selectFolder" id="selectFolder" form="selectFolder">
                {this.context.folders.map(folder =>
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                  )}
              </select>
              
            </div>

            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea type="text" className="content"
                name="content" id="content" onChange={this.validateContent} onBlur={this.validateContent} required/>

                
            </div>
            
            { contentError && <p className='error'>{contentError}</p>}
            

            <div className="addNoteButtons form-group">
              <button type="reset" className="addNoteCancel" onClick={this.formCanceled}>
                  Cancel
              </button>
              <button type="submit" className="addNoteSave" disabled={ titleError || contentError }>
                  Save
              </button>
            </div>
          </form>
        </NoteError>
      </div>
      
    )
  }
}


