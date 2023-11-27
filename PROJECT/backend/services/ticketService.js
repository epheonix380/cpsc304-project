const db = require("../db/db");

async function getSection(eventid, venueid, amount) {
    let sanEventID, sanVenueID, sanAmount;
    // Sanitizing input here
    try {
        sanEventID = parseInt(eventid);
        sanVenueID = parseInt(venueid);
        sanAmount  = parseInt(amount );
    } catch {
        return false;
    }
    return await db.getFromDB(`
        SELECT Ticket.* 
        FROM Ticket, (
            SELECT sectionnumber, eventid, venueid
            FROM
                (SELECT Ticket.sectionnumber, Ticket.eventid, Ticket.venueid,
                    COUNT(*) as amount, Section.numberofseats
                    FROM Ticket, Issued, Section
                    WHERE 
                        Ticket.ticketid = Issued.ticketid AND
                        Ticket.eventid = \:eventid AND
                        Ticket.venueid = \:venueid AND
                        Section.eventid = Ticket.eventid AND
                        Section.venueid = Ticket.venueid AND
                        Section.sectionnumber = Ticket.sectionnumber
                    GROUP BY Ticket.sectionnumber, Ticket.eventid, 
                        Ticket.venueid, Section.numberofseats
                    ) SectionAgr
            WHERE (numberofseats - amount) >= \:amount
        ) Sections
        WHERE 
            Ticket.sectionnumber = Sections.sectionnumber AND
            Ticket.eventid = Sections.eventid AND
            Ticket.venueid = Sections.venueid AND
            Ticket.ticketid NOT IN (
                SELECT Ticket.ticketid
                FROM Ticket, Issued
                WHERE 
                    Ticket.ticketid = Issued.ticketid AND
                    Ticket.eventid = \:eventid AND
                    Ticket.venueid = \:venueid
            )
    `, [sanEventID, sanVenueID, sanAmount])
}

async function purchaseTicket(userid, list) {
    const successList = [];
    let sanUserID;
    try {
        sanUserID = parseInt(userid);
    } catch {
        return successList;
    }
    for (let i = 0; i<list.length; i++) {
        let sanTicketID
        try {
            sanTicketID = parseInt(list[i]);
        } catch {
            return successList
        }
        await db.run(`
            INSERT INTO Issued 
                (ticketid, userid) values
                (\:ticketid, \:userid)

        `,[sanTicketID, sanUserID]).then(()=>{
            successList.push(list[i])
        }).catch(()=>{})
    }
    return successList;

}

module.exports = {
    getSection,
    purchaseTicket,
}