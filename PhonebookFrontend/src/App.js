import { useState, useEffect} from 'react'
import doThings from './Sources/persons'
import Book from './Components/Book'


const Filter = ({filter,handleFilter}) =>
(
  <div>
    filter shown with <input value ={filter ||""} onChange={handleFilter}/>
  </div>
)

const Addinfo =({name, addInfo, handleName, number, handleNumber})=>
(
  <form onSubmit={addInfo}>
  <div>
    name: <input value ={name ||""}
    onChange={handleName}
    />
  </div>
  <div>
    number: <input value ={number ||""}
    onChange={handleNumber}
    />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
  </form>
)

const selectStyle = [
  {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    border: "5px solid green",
    borderRadius:11,
    padding: 10,
    marginBottom: 10
  },
  {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    border: "5px solid red",
    borderRadius:11,
    padding: 10,
    marginBottom: 10
  }
]


const App = () => {
  
  const [Name, setName] = useState([]) 
  const [newName, setNewName] = useState()
  const [newNumber, setNewNumber] = useState()
  const [filter, setFilter] = useState()
  const [errorMessage, setErrorMessage] = useState(null)
  const [selected, setSelected] = useState(selectStyle[0])


  const Notification = ({ message, selected }) => {
    if (message === null) {
      return null
    }
    
    return (
      <div style={selected}>
        {message}
      </div>
    )
  }

  useEffect(() => {
    doThings
      .getAll()
      .then(initialNotes => {
        setName(initialNotes)
      })
  }, [])
  

  const addInformation = (event) => 
  {
    event.preventDefault()
    const person = Name.find(person => person.name ===newName)

    if (Name.some(element => element.name === newName))
    { 
      
      if (window.confirm(`Change number of ${newName}?`))
        doThings
        .update(person.id,newNumber,newName)
        .then(ret => { 
          setName(Name.map(list => list.id !==person.id ? list:ret))
          setNewName('')
          setNewNumber('')
          setSelected (selectStyle[0])
          setErrorMessage(
            `Number successfully changed`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        }).catch(error=> {
          setSelected (selectStyle[1])
          setErrorMessage(`Information of ${newName} has already removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 500)
          setName(Name.filter(n => n.id !== person.id))
        })
    }

    else{
      const noteObject = 
      {
        name: newName,
        number: newNumber,
        //id: Name[Name.length - 1].id+1,
      }

      doThings
      .add(noteObject)
      .then(returnedNote => {
        setName(Name.concat(returnedNote))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Name successfully added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 500)
      }).catch(error=> {
        setErrorMessage(
          `${error.response.data.error} refresh page`
        )
      })

     
    }

    //setName(Add.concat(noteObject))
  }

  // const handleNameChange = (event) => setNewName(event.target.value)
  // const handleNumberChange = (event) => setNewNumber(event.target.value)
  // const handleFilterChange = (event) => setFilter(event.target.value)
  const handleChange = setValue => a => setValue(a.target.value) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} selected={selected}/>
      <Filter filter={filter} handleFilter={handleChange(setFilter)}/>
      <h2>add a new</h2>
      <Addinfo name={newName} addInfo={addInformation} handleName={handleChange(setNewName)} number={newNumber} handleNumber={handleChange(setNewNumber)}/>
      <h3>Numbers</h3>
      <ul>
        {Name.map(note => 
        <Book key={note.id} note={note} filter={filter ||""} setName={setName} Name ={Name}/>
        )}
      </ul>
    </div>
  )
}

export default App