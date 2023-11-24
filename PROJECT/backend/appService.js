const db = require("./db.js");
const initDB = require("./initDB.js");
// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.

async function fetchTablesFromDB() {
    if (db.getIsOracle()) {
        return await db.getFromDB(`
            SELECT table_name as name
            FROM all_tables
            `).then(
            (res)=>{
                return res
            }
        ).catch((err)=>{
            return []
        })
    } else {
        return await db.getFromDB(`
            SELECT 
                name
            FROM 
                sqlite_schema
            WHERE 
                type ='table' AND 
                name NOT LIKE 'sqlite_%'
        `).then(
            (res)=>{
                return res
            }
        ).catch((err)=>{
            return []
        })
    }
}

async function initTables() {
    return await initDB.resetAll(db);
}

async function testDBConnection() {
    return await db.testConnection().then((suc)=>true).catch(
        (err)=>{
            return false;
        }
    )
}

module.exports = {
    testOracleConnection:testDBConnection,
    fetchTablesFromDB,
    initTables,
};