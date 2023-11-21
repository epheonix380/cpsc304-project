const express = require('express');
const appService = require('./appService');
const eventService = require('./eventService')
const userService = require("./userService");
const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-demotable", async (req, res) => {
    const { id, name } = req.body;
    const insertResult = await appService.insertDemotable(id, name);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/count-demotable', async (req, res) => {
    const tableCount = await appService.countDemotable();
    if (tableCount >= 0) {
        res.json({ 
            success: true,  
            count: tableCount
        });
    } else {
        res.status(500).json({ 
            success: false, 
            count: tableCount
        });
    }
});

router.get("/events", async (req, res) => {
    const orderBy = req.query.orderBy;
    const data = await eventService.getEvents(orderBy);
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(500);
    }
})

router.get("/tickets/:userID", async (req, res) => {
    const userID = req.params.userID;
    const data = await userService.getUserTickets(userID);
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(500);
    }
    
}) 

router.get("/users", async (req, res) => {
    const userID = req.params.userID;
    const data = await userService.getAllUsers();
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(500);
    }
    
}) 


module.exports = router;