import React, {useState, useEffect} from 'react';

import './App.css'; 
import api from './services/api';

import backgroundImg from './assets/background.png';
import Header from './Components/Header'

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {

        const response = await api.post('projects', {
            title : `Project #${projects.length}`,
            owner : 'Candido'
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title='Projects'>
                <ul>
                    {projects.map(project => <li key={project.id}> {project.title} </li>)}
                </ul>
            </Header>
        
            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    )
}