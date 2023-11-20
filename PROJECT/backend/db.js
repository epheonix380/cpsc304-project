const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
};

let isOracle = true;

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
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
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
                resolve(result.rows);
            }).catch(() => {
                return [];
            });
        }
        return await withSQLiteDB(async (connection) => {
            connection.all(sql, (err, rows) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        }).catch(() => {
            reject()
        });
    })
}

async function testConnection() {
    return new Promise(async (resolve, reject) => {
        if (isOracle) {
            return await withOracleDB(async (connection) => {
                resolve()
            }).catch(() => {
                reject()
            });
        }
        
        return await withSQLiteDB(async (connection) => {
            resolve()
        }).catch(() => {
            reject()
        });
    })
}

async function run(sql, ...args) {
    return new Promise(async(resolve, reject)=> {
        if(isOracle) {
            return await withOracleDB(async (connection) => {
                try {
                    result = await connection.execute(sql, ...args);
                    resolve(result)
                } catch(err) {
                    reject()
                }
            }).catch(() => {
                reject()
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
            }).catch(() => {
                reject()
            });
        }
    })
}

module.exports =  {
    getFromDB,
    run,
    testConnection,
}