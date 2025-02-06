import {useState} from 'react'

const initialState ={
    name: '',
    age: '',
    breed: ''
}

function PetForm(props) {
    const [formData, setFormData] = useState(
        props.selectpet ? props.selectpet : initialState)

    const handleChange =(event) => {
        setFormData({...formData, [event.target.name]: event.target.value})

    }


    const handleSubmit =(event) => {
        event.preventDefault()
        if (props.selectpet) {
            props.handleUpdatePet(formData, props.selectpet._id)
        } else {
            props.handleAddPet(formData)
        }
    }

  return (
    <>
    <div>
        <form action="" method="post" onSubmit={handleSubmit}>
            <label htmlFor="name">name</label>
            <input type="text" name='name' value={formData.name} required onChange={handleChange}/>
            <label htmlFor="age">age</label>
            <input type="text" name="age"value={formData.age} onChange={handleChange}/>
            <label htmlFor="breed">breed</label>
            <input type="text" name='breed' value={formData.breed} onChange={handleChange}/>
            <button type="submit">
                    {props.selectpet ? 'Update Pet' : 'Add New Pet'}
                </button>
        </form>
    </div>
    </>
  )
}

export default PetForm
