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

router.get('/tables', async (req, res) => {
    const tableContent = await appService.fetchTablesFromDB();
    res.json({data: tableContent});
});

router.post("/initiate-tables", async (req, res) => {
    const initiateResult = await appService.initTables();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
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

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

router.post("/purchase", async (req, res) => {
    const { userid, tickets } = req.body;
    if (userid === null || userid === undefined || !isIterable(tickets)) {
        res.sendStatus(400);
    } else {
        const data = await eventService.purchaseTicket(userid, tickets);
        res.json({data})
    }
    
})

router.get("/sections", async (req, res) => {
    const eventid = req.query.eventid;
    const venueid = req.query.venueid;
    const amount = req.query.amount;
    let data;
    if ((eventid && venueid && amount)) {
        data = await eventService.getSection(eventid, venueid,amount);
    } else {
        res.sendStatus(400)
    }
    
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(500);
    }
    
}) 


module.exports = router;