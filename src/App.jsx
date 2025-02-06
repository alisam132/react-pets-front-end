// src/App.jsx
import { useState, useEffect } from "react";
import * as petService from "./services/petService";
import PetList from "./components/PetList";
import PetDetail from "./components/PetDetail";
import PetForm from "./components/PetForm";

const App = () => {
  const [pets, setPets] = useState([]);
  const [selectpet, setSelectpet] = useState(null);
  const [isFormOpen, setisFormOpen] = useState(false);

  const handleSelect = (pet) => {
    setSelectpet(pet);
    setisFormOpen(false);
  };

  const handleFormView = (pet) => {
    if (!pet._id) setSelectpet(null);
    setisFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      setPets([newPet, ...pets]);
      setisFormOpen(false);
    } catch (error) {
      console.log(error.massage);
    }
  };

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData, petId);

      if (updatedPet.err) {
        throw new Error(updatedPet.err);
      }

      const updatedPetList = pets.map((pet) =>
        pet._id !== updatedPet._id ? pet : updatedPet
      );

      setPets(updatedPetList);
      setSelectpet(updatedPet);
      setisFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      const deletedPet = await petService.deletePet(petId);
      console.log(deletedPet);
      console.log(petId);
      
      if (deletedPet.err) {
        throw new Error(deletedPet.err);
      }
      setPets(pets.filter((pet) => pet._id !== deletedPet._id));
      setSelectpet(null);
      setisFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPets = async () => {
      const fetchedPets = await petService.index();
      if (fetchPets.error) {
        throw new Error(fetchedPets.error);
      }
      setPets(fetchedPets);
    };

    fetchPets();
  }, []);

  return (
    <>
      <PetList
        pets={pets}
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <PetForm handleAddPet={handleAddPet} selectpet={selectpet} handleUpdatePet={handleUpdatePet}/>
      ) : (
        <PetDetail selectpet={selectpet} handleFormView={handleFormView} handleDeletePet={handleDeletePet}/>
      )}
    </>
  );
};
export default App;
