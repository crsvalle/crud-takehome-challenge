const express = require('express')
const jobs = express.Router();

const { getAllApplications, getApplicationById, createApplication, updateApplication, deleteApplication, } = require('../queries/jobApplicationsQueries')
const { validateId, validateApp } = require('../validations/checkJobs')

jobs.get('/', async (req, res) => {
    try{
        const allJobs = await getAllApplications()
        if (allJobs[0]) {
            res.status(200).json({ data: allJobs })
        } else {
            res.status(404).json({ error: "No jobs found" })
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
})
jobs.get('/:id', validateId, async (req, res) => { 
    const { id } = req.params;
    try{
        const oneJob = await getApplicationById(Number(id));
        if (oneJob){
            res.status(200).json({data: oneJob})
        }else{
            res.status(404).json({error: "Job not found"})
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
})
jobs.post('/', validateApp, async (req, res) => {
    try{
        const createdJob = await createApplication(req.body);
        if (createdJob){
            res.status(201).json({data: createdJob})
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

jobs.delete('/:id', validateId, async (req, res) => { 
    const { id } = req.params;
    try{
        const deleteJob = await deleteApplication(Number(id))
        if(!deleteJob){
            return res.status(404).json({error: `Could not delete because ${id} does not exist`})
        }
        res.status(200).json({data: deleteJob})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

jobs.put('/:id', validateId, validateApp, async (req, res) => {
    const { id } = req.params;
    try{
        const editedJob = await updateApplication(Number(id), req.body);
        if (editedJob){
            res.status(200).json({data: editedJob})
        }else{
            res.status(404).json({error: "Updating failed"})
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = jobs