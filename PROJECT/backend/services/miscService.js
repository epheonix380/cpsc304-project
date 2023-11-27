const db = require("../db/db");


async function getConcessions(venueid) {
    return await db.getFromDB(`
        SELECT Concession.*
        FROM ConcessionVenue, Concession
        WHERE 
            ConcessionVenue.venueid = \:venueid AND
            ConcessionVenue.itemname = Concession.itemname
        ORDER BY Concession.itemname
    `,[venueid])
}

async function getProvince(city) {
    return await db.getFromDB(`
        SELECT province
        FROM CityProvinceMap
        WHERE UPPER(city) = UPPER(\:city)
    `,[city])
}

module.exports = {
    getConcessions,
    getProvince
}