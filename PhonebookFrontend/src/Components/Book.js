import { useState } from 'react'
import doThings from '../Sources/persons'

const Book = ({ note, filter ,setName, Name}) => 
{
    const [val, setVal] = useState(false)
    const handleChange = () => {setVal(false)}
    const handleDel = () => setVal(true)

    const remove = (id) =>
    {   if (window.confirm(`Delete ${note.name}?`))
        {
            doThings
                .del(id)
                .then(() => {setName(Name.filter(n => n.id !== id))
                //console.log(setName)
                })
        }
    }

    if( note.name.toLowerCase().includes(filter))
    {   
        return (
            <>
            <li>{note.name} || {note.number} <button onClick={handleDel} onChange={handleChange}>delete</button></li>
            {val && remove(note.id)}
            </>
        )
    }
}
//n => n.id !== note.id
export default Book