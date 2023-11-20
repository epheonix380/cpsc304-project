const db = require("./db.js");
const initDB = require("./initDB.js");
// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.

async function fetchDemotableFromDb() {
    return await db.getFromDB('SELECT * FROM DEMOTABLE').then(
        (res)=>{
            return res
        }
    ).catch((err)=>{
        return []
    })
}

async function initiateDemotable() {
    return await initDB.resetAll(db);
}

async function insertDemotable(id, name) {
    return await db.run(
        `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
        [id, name],
        { autoCommit: true })
        .then((res)=>res)
        .catch(()=>false)
}

async function updateNameDemotable(oldName, newName) {
    return await db.run(
        `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
        [newName, oldName],
        { autoCommit: true })
        .then((res)=>res)
        .catch(()=>false)
}

async function testDBConnection() {
    return await db.testConnection().then((suc)=>true).catch(
        (err)=>{
            return false;
        }
    )
}

async function countDemotable() {
    return await db.getFromDB('SELECT Count(*) FROM DEMOTABLE').then((res)=>{
        if (typeof(res) === "number") {
            return res;
        }
        return res[0]['Count(*)'];
    }).catch(()=>0);
}

module.exports = {
    testOracleConnection:testDBConnection,
    fetchDemotableFromDb,
    initiateDemotable, 
    insertDemotable, 
    updateNameDemotable, 
    countDemotable
};