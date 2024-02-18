const express = require('express')
const jobs = express.Router();

const { getAllApplications, getApplicationById, createApplication, updateApplication, deleteApplication, } = require('../queries/jobApplicationsQueries')

jobs.get('/', async (req, res) => {
    try{
        const allJobs = await getAllApplications()
        if (allJobs[0]) {
            res.status(200).json({ data: allJobs })
        } else {
            res.status(404).json({ error: "No jobs found" })
        }
    }catch(error){
        res.status(500).json({error: "Server Error"})
    }
})
jobs.get('/:id', async (req, res) => { 
    const { id } = req.params;
    try{
        const oneJob = await getApplicationById(Number(id));
        if (oneJob){
            res.status(200).json({data: oneJob})
        }else{
            res.status(404).json({error: "Job not found"})
        }
    }catch(error){
        res.status(500).json({error: "Server Error"})
    }
})
jobs.post('/', async (req, res) => { })

jobs.delete('/:id', async (req, res) => { 
    const { id } = req.params;
    try{
        const deleteJob = await deleteApplication(Number(id))
        if(!deleteJob){
            res.status(404).json({error: "Could not delete because it was not found"})
        }
        res.status(200).json({data: deleteJob})
    }catch(error){
        res.status(500).json({error: "Server Error"})
    }
})
jobs.put('/:id', async (req, res) => { })

module.exports = jobs