const config = {
    user: 'sa',
    password: 'bahar123',
    server: 'localhost',
    // driver: 'tedious',
    database: 'Products',
    options: {
        trustedconnection: true,
        enableArithAbort: true,
        instancename: 'BAHAR'
    },
    port: 7903
}

module.exports = config;