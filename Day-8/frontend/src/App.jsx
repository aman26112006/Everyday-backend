import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import axios from 'axios'

function App() {
  
  const [ notes,setNotes ] = useState([])


  function fetchnotes(){
    axios.get('http://localhost:3000/Api/notes')
    .then((res) => {
    setNotes(res.data.note)
    })
  }
  useEffect(()=>{
    fetchnotes()
},[])
  function handleSubmit(e){
    e.preventDefault()

    const {title,description} = e.target.elements

    console.log(title.value,description.value)
    axios.post("http://localhost:3000/Api/notes",{
      title:title.value,
      description:description.value
    }).then((res)=>{
      console.log(res.data)
      fetchnotes()
    })
  }
 
  function handledeleteNote(noteId){
    axios.delete("http://localhost:3000/Api/notes/"+noteId)
    .then((res=>{
      console.log(res.data)
      fetchnotes()
    }))
  }
  
  return (
    <>
    <form className='note-created-form' onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='Enter title' />
      <input name='description' type="text" placeholder='Enter description'/>
      <button>Create note</button>
    </form>
    <div className='notes'>
      {
        notes.map(note => {
          return <div className='note' >
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{handledeleteNote(note._id)}}>delete</button>
            </div>
        })
      }

    </div>
    </>
  )
}

export default App
