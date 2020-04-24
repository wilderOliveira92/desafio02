import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Desafio ReactJS",
      url: "www.dada.dasda/dasda",
      techs: ["react js", "node js", "react native"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    const repoIndex = repositories.findIndex((repo) => repo.id === id);
    repositories.splice(repoIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(
          (repo) =>
            repo && (
              <li key={repo.id}>
                {repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
