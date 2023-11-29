const db = require("../db/db.js");
const initDB = require("../db/initDB.js");
// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.

async function fetchTablesFromDB() {
    if (db.getIsOracle()) {
        return await db.getFromDB(`
            SELECT table_name as name
            FROM user_tables
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

async function getAttributesOfTable(tableName) {
    const re = /[a-zA-Z][a-zA-Z1-9]*/;
    const sanTableName = tableName.match(re);
    if (sanTableName[0]) {
        if (db.getIsOracle()) { 
            return await db.getFromDB(`
                SELECT column_name as name
                FROM USER_TAB_COLUMNS
                WHERE table_name = \:tablename
                `, [sanTableName[0].toUpperCase()]).catch((err)=>{
                    console.log(err)
                    return [];
                });
        } else {
            // This is cursed
            const sqlite = sanTableName[0].slice(0,1).toUpperCase() + sanTableName[0].slice(1);
            return await db.getFromDB(`
                SELECT name FROM pragma_table_info(:tablename) ORDER BY cid;
                `, sqlite);
        }
    } 
    return false;
   
    
}

async function fetchDynamicAttributeTable(tableName, attributes) {
    const re = /[a-zA-Z][a-zA-Z1-9]*/;
    const sanTableName = tableName.match(re)[0];
    let sanAttributes = "";
    for (let i = 0; i<attributes.length; i++) {
        const tempAtr = attributes[i].match(re)[0];
        if (tempAtr) {
            if (i !== 0) {
                sanAttributes += " ,";
            }
            sanAttributes += ` ${tempAtr}`
        }
    }
    return await db.getFromDB(`
        SELECT ${sanAttributes}
        FROM ${sanTableName}
    `);
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
    getAttributesOfTable,
    fetchDynamicAttributeTable
};