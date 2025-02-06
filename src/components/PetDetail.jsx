function PetDetail(props) {
  if (!props.selectpet) {
    return <div>No details</div>;
  }
  return (
    <>
      <h1>{props.selectpet.name}</h1>
      <h2>Breed: {props.selectpet.breed}</h2>
      <h2>
        Age: {props.selectpet.age} year{props.selectpet.age > 1 ? "s" : ""} old
      </h2>
      <button onClick={() => props.handleFormView(props.selectpet)}>Edit Pet</button>
      <button onClick={() => props.handleDeletePet(props.selectpet._id)}>Delete Pet</button>
    </>
  );
}

export default PetDetail;
