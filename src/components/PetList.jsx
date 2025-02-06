
const PetList = (props) => {
  return (
    <>
      <div>
        <h1>PetList</h1>
      </div>
      <div>
        {!props.pets.length ? (
          <h1>no pets yet...!</h1>
        ) : (
          <ul>
            {props.pets.map((pet) => (
              <li key={pet._id} onClick={() => props.handleSelect(pet)}>
                {pet.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={props.handleFormView}>{props.isFormOpen ?  'close the form': 'Add new Pet '}</button>
    </>
  );
}

export default PetList;
