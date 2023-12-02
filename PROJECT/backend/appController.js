const express = require('express');
const appService = require('./services/appService');
const eventService = require('./services/eventService')
const miscService = require('./services/miscService')
const ticketService = require('./services/ticketService')
const userService = require("./services/userService");
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

router.get('/columns/:table', async (req, res) => {
    const table = req.params.table;
    const tableContent = await appService.getAttributesOfTable(table);
    res.json({data: tableContent});
});

router.post('/flex-table', async (req, res) => {
    const {tablename, attributes} = req.body;
    const tableContent = await appService.fetchDynamicAttributeTable(tablename, attributes);
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

router.post("/update/user", async (req, res) => {
    const {userid, username, name, city, password} = req.body;
    const result = await userService.updateUserTicket();
    if (result) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get("/event/:eventid", async (req, res) => {
    const eventid = req.params.eventid;
    const data = await eventService.getVenuesFromEventID(eventid);
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(500);
    }
})

router.get("/events", async (req, res) => {
    const orderBy = req.query.orderBy;
    const data = await eventService.getEvents(orderBy);
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(500);
    }
})

router.get("/tickets/unsold", async (req, res) => {
    const data = await ticketService.getUnsoldTickets();
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(500);
    }
})

router.get("/multi-city", async (req, res) => {
    const data = await eventService.multiCityTour();
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(500);
    }
})

router.get("/tour", async (req, res) => {
    const data = await eventService.canadianTour();
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(500);
    }
})

router.delete("/tickets/:ticketid", async (req, res) => {
    const ticketid = req.params.ticketid;
    const data = await ticketService.deleteTicket(ticketid);
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(500);
    }
    
})

router.post("/tickets/:userID", async (req, res) => {
    const userID = req.params.userID;
    const filter = req.body.filter;
    const data = await userService.getUserTickets(userID, filter);
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

router.get("/user/:userID", async (req, res) => {
    const userID = req.params.userID;
    const data = await userService.getUser(userID);
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(500);
    }

})

router.get("/concessions/:venueid", async (req, res) => {
    const venueueid = req.params.venueid;
    const data = await miscService.getConcessions(venueueid);
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(400);
    }
})

router.get("/province/:city", async (req, res) => {
    const city = req.params.city;
    const data = await miscService.getProvince(city);
    if (data) {
        res.json({data});
    } else {
        res.sendStatus(400);
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
        const data = await ticketService.purchaseTicket(userid, tickets);
        res.json({data})
    }
    
})

router.get("/sections", async (req, res) => {
    const eventid = req.query.eventid;
    const venueid = req.query.venueid;
    const amount = req.query.amount;
    let data;
    if ((eventid && venueid && amount)) {
        data = await ticketService.getSection(eventid, venueid,amount);
        if (data) {
            res.json({data});
        } else {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(400)
    }

    
}) 


module.exports = router;