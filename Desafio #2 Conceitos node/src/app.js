const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
  
const valid_repository = (request, response, next) => {
  const { id } = request.params;
  const idx = repositories.findIndex(r => id == r.id);
  
  if(idx == -1) 
    return response.status(400).json('Repository not find');

  request.repository = repositories[idx];
  request.repositoryIndex = idx;

  return next();
}

// LIST REPOSITORIES 
app.get("/repositories", (request, response) => response.json(repositories));

// CREATE REPOSITORY 
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes : 0
  }

  repositories.push(repository);

  return response.json(repository);
});

// EDIT REPOSITORY
app.put("/repositories/:id", valid_repository, (request, response) => {
  const repository = request.repository;
  const { title, url, techs } = request.body;
  const obj = { title, url, techs };
  
  for(atr in obj) {
    if(!obj[atr]) continue;
    repository[atr] = obj[atr];
  }
  
  return response.json(repository);
}); 

// DELETE REPOSITORY
app.delete("/repositories/:id", valid_repository, (request, response) => {
  const { id } = request.params;
  const idx = request.repositoryIndex;

  repositories.splice(idx, 1);

  return response.status(204).json();
});

// LIKE REPOSITORY
app.post("/repositories/:id/like", valid_repository, (request, response) => {
  const repository = request.repository;

  repository.likes++;

  return response.json(repository);
});


module.exports = app;
