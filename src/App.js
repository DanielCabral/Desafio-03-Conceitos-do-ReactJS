import React,{useState,useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories,setProjects]=useState([]);

  useEffect(()=>{
    api.get('repositories')
      .then(response=>{
        setProjects(response.data);
      });
  },[]);

  async function handleAddRepository() {
    const response=await api.post('repositories',{
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    const repositorie=response.data;
    setProjects([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response=await api.delete('/repositories/'+id);
    if(response.status==204){
      const repositorieIndex=repositories.findIndex(repositorie=>repositorie.id==id);
      setProjects(repositories.filter(repositorie=>repositorie.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repositorie=><li key={repositorie.id}>{repositorie.title} <button onClick={() => handleRemoveRepository(repositorie.id)}>     Remover</button> </li> )}    
        </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
