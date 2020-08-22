import React, { Component } from 'react'
import ApiContext from '../ApiContext.js'
import NoteError from "../NoteError";
import './AddFolderForm.css'
import FolderError from '../FolderError.js';

export default class AddFolder extends Component {
  state= {
    titleError: null,
  }


  static contextType = ApiContext;



  addFolderToApi(folder) {
    fetch(`http://localhost:9090/folders`, {method: 'POST', body: JSON.stringify(folder) }).then(
      r => {
        if (r.ok)
          return r.json();

        throw new Error(r);
      }
    ).then(
      ({id}) => { 
        this.context.addFolder({...folder, id})
        this.props.history.push(`/folder/${id}`)
    }
    ).catch(error => alert('Something went wrong. Please check your connection and try again.')) 
      
    
  }

  formSubmitted = e => { 
    e.preventDefault()
    console.log(e.currentTarget.folderTitle.value)
    
    const note = {
      name: e.currentTarget.folderTitle.value, 
    }
    this.addFolderToApi(note)
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

  render () {

    const { titleError } = this.state;


    return (
        <div className='folderDiv'>
          <FolderError>
              <h2>Add a Folder</h2>
              <form className="addFolder" onSubmit={this.formSubmitted}>
                  <div className="form-group">
                  <label htmlFor="folderTitle">Folder Title</label>
                  <input 
                    type="text" 
                    className="folderTitle"
                    name="folderTitle" 
                    id="folderTitle" 
                    onChange={this.validateTitle} 
                    onBlur={this.validateTitle}
                    required
                    />
                  </div>

                  <div className='error'>
                    {titleError && <p>{titleError}</p>}
                  </div>

                  <div className="addFolderButtons form-group">
                  <button type="reset" className="addFolderCancel">
                      Cancel
                  </button>
                  <button type="submit" className="addFolderSave">
                      Save
                  </button>
                  </div>
              </form>
          </FolderError>
        </div>    
    
        
    )
  }
}

