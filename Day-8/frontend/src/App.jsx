import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import axios from 'axios'

function App() {
  
  const [ notes,setNotes ] = useState([
    {
    title:"test title1",
    description:"test description1"
  },
    {
    title:"test title2",
    description:"test description2"
  },
    {
    title:"test title3",
    description:"test description3"
  },
    {
    title:"test title4",
    description:"test description4"
  }
  
])
axios.get('http://localhost:3000/Api/notes')
.then((res) => {
  setNotes(res.data.note)
})
 
  
  return (
    <>
    <div className='notes'>
      {
        notes.map(note => {
          return <div className='note'>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </div>
        })
      }
      
    </div>
    </>
  )
}

export default App
