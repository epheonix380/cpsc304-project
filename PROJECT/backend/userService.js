const crypto = require("crypto")

async function createUser(db, name, city, password) {
    const pk = Math.floor(new Date().getTime()/1000)
    return await db.run(`
        insert into Customer 
        (userID, name, city, password) values 
        (${pk}, '${name}', '${city}', '${password}')
    `).then((res)=>true).catch((err)=>false);
}

async function generateUserSession(db, userID, password, singleUse) {
    const userID = await db.run(`SELECT userID FROM Customer WHERE userID=${userID} AND password='${password}'`).then((res)=>res).catch(()=>false)
    if (userID !== false) {
        console.log(userID);
        const token = crypto.randomBytes(32);
        const su = singleUse?1:0;
        const diff = 120;
        const expire = singleUse?new Date(Date.now() + diff*60000):null;
        return await db.run(`
            insert into CustomerSession 
            (userID, sessionToken, singleUse, expire) values 
            (${userID}, '${token}', ${su}, ${expire})
        `)
    }
}

async function getAuthUserInfo(db, sessionToken) {
    const res = await db.run(`
    SELECT Customer.userID, Customer.name, Customer.city 
    FROM Customer, CustomerSession 
    WHERE Customer.userID = CustomerSession.userID 
    AND CustomerSession.sessionID = '${sessionToken}'
    AND CustomerSession.singleUse <> -1`).then((res)=>res).catch(()=>false);

    return res
}