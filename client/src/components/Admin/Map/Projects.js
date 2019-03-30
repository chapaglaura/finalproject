import React, { Component } from 'react';
import API from '../../../utils/API';

async function Projects (props) {

    const projects = await getProjects();
    console.log(projects);

    return (
        <option>1</option>
    )
}

function getProjects () {
    API.getAll('project')
    .then(res => {
        return res.data;
    })
}

export default Projects;