import React, {useState, useEffect} from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]); 

  useEffect(()=> {
    api.get('repositories').then(response=>{
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:  `Desafio ${repositories.length}`,
      url : "http://github.com/...",
      techs: ["Node.js", "..."]
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const new_repositories = [...repositories];
    const response = await api.delete(`repositories/${id}`);

    const idx = repositories.findIndex(r => r.id == id);
    new_repositories.splice(idx, 1);
    setRepositories(new_repositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {
          repositories.map(repository => {
            return (
              <li key={repository.id} > {repository.title}
                <button onClick={() => {handleRemoveRepository(repository.id)}}>
                  Remover
                </button>
              </li>
            )
          })
        }
    
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
