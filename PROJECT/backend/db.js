const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
};
console.log({dbConfig})
let isOracle = true;

/*
    This exists because I could not get the oracleDB to work locally
    my solution was to start a sqlite3 db locally so that noone has this problem
    This will work for 90% of all cases as there is very little difference between them
    at the scales that we are working at
    sqlite3 does not need any special software to work, just an npm library
    This unfotunately does not work on department servers becaause they don't have npm
    This code therefore exists to make this project database agnostic
    This project will use oracleDB on department servers and sqlite3 db locally
*/
let connection;
async function withSQLiteDB(action) {
    const sqlite3 = require('sqlite3').verbose();
    try {
        connection = new sqlite3.Database('local.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.log("Error creating SQLite3 DB")
                throw err;
            }
        })
        return await action(connection);
    } catch (err) {
        console.log("Error creating SQLite3 DB")
        console.log(err)
        throw err;
    }
}

async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        return await action(connection);
    } catch (err) {
        console.log({err});
        console.log("Failed to find oracleDB")
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.log("Failed to close connection");
            }
        }
    }
}

withOracleDB(() => {
    isOracle = true;
    console.log("Using oracleDB")
}).catch(() => {
    isOracle = false;
    console.log("Using SQLite")
});

async function getFromDB(sql) {
    return new Promise (async (resolve, reject) =>  {
        if (isOracle) {
            return await withOracleDB(async (connection) => {
                const result = await connection.execute(sql);
                const names = result.metaData;
                const rows = result.rows;
                const final = [];
                for (let i = 0; i<rows.length; i++) {
                    const tempObj = {}
                    for (let j = 0; j<names.length; j++) {
                        tempObj[names[j]['name'].toLowerCase()] = rows[i][j];
                    }
                    final.push(tempObj)
                }
                resolve(final);
            }).catch((err) => {
                reject(err);
            });
        }
        return await withSQLiteDB(async (connection) => {
            connection.all(sql, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        }).catch((err) => {
            reject(err)
        });
    })
}

async function testConnection() {
    return new Promise(async (resolve, reject) => {
        if (isOracle) {
            return await withOracleDB(async (connection) => {
                resolve()
            }).catch((err) => {
                reject(err)
            });
        }
        
        return await withSQLiteDB(async (connection) => {
            resolve()
        }).catch((err) => {
            reject(err)
        });
    })
}

async function run(sql, ...args) {
    return new Promise(async(resolve, reject)=> {
        if(isOracle) {
            return await withOracleDB(async (connection) => {
                try {
                    result = await connection.execute(sql, ...args);
                    await connection.commit()
                    resolve(result)
                } catch(err) {
                    reject(err)
                }
            }).catch((err) => {
                reject(err)
            });
        } else {
            return await withSQLiteDB(async (connection) => {
                try {
                    await connection.run(sql, ...args, function (err) {
                        if (err) {
                            reject(err)
                        }
                        resolve(this)
                    });
                } catch(err) {
                    reject(err)
                }
            }).catch((err) => {
                reject(err)
            });
        }
    })
}

function getIsOracle() {
    return isOracle;
}

module.exports =  {
    getFromDB,
    run,
    testConnection,
    getIsOracle
}