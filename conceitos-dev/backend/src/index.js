const express = require('express');
const cors = require('cors');
const {uuid} = require('uuidv4');
const app = express();

app.use(cors());
app.use(express.json());
    

const projects = [];

const logRequest = (request, response, next) => { //middleware
    const {method, url} = request;

    console.log(`[${method.toUpperCase()}] ${url}`);

    return next();
}

app.use(logRequest);
// app.use('/project/:id', logRequest);
// app.get('/projects', logRequest, (request, response) => {
app.get('/projects', (request, response) => {
    const { title } = request.query;

    const filter = title 
        ? projects.filter(project => project.title.includes(title))
        : projects;


    return response.json(filter);
});

app.post('/projects', (request, response) => {
    const {title, owner} = request.body;

    const project = {id: uuid(), title, owner};

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({error : 'Project not found'});
    }

    const {title, owner} = request.body;
    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({error : 'Project not found'});
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3000, () => {
    console.log('🚀 Backend started !');
});




