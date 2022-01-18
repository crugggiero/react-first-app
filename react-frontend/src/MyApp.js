import React, {useState, useEffect} from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'



function MyApp() {

  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    fetchAll().then( result => {
      if(result)
        setCharacters(result);
    });
  }, [] );

  function removeOneCharacter (index) {
    makeDeleteCall(characters[index]['id']).then( result => {
      if (result && result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);
      }
    });
  }

  function updateList(person) {
    makePostCall(person).then( result => {
      if (result && result.status === 201) {
        person = result.data;
        setCharacters([...characters, person])
      }
    });
  }

  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;
    } catch (error) {
      console.log(error);
      return false
    }
  }

  async function makePostCall(person) {
    try {
      console.log(person)
      const response = await axios.post('http://localhost:5000/users', person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(id) {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
      <div className="container">
        <Table characterData={characters} removeCharacter={removeOneCharacter} />
        <Form handleSubmit={updateList} />
      </div>
    );  
}


export default MyApp;