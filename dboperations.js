var config = require('./dbconfig');
const sql = require('mssql');
const order = require('./order');

async function getOrders(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query('SELECT * FROM Orders');
        return products.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

async function getOrder(orderId){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
        .input('input_parameter', sql.Int, orderId)
        .query("SELECT * FROM Orders WHERE Id = @input_parameter");
        return product.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function addOrder(table_name, data){
    try{
        const fields = [];
        const values = [];
        let pool = await sql.connect(config);
        let insert = await pool.request();

        for (const [key, value] of Object.entries(data)) {
            if(key !== 'Id'){
                fields.push(`[${key}]`);
                values.push("'" + value + "'");
                insert.input(`${key}`, sql.NVarChar, value);
            }
          }

          insert.query(`INSERT INTO ${table_name} (${fields.toString()}) VALUES(${values.toString()})`);
          return insert.recordsets;

        // let pool = await sql.connect(config);
        // let inserProduct = await pool.request()
        // .input('Title', sql.NVarChar, order.Title)
        // .input('Quantity', sql.Int, order.Quantity)
        // .input('Message', sql.NVarChar, order.Message)
        // .input('City', sql.NVarChar, order.City)
        // .execute('InsertOrders');
        // return inserProduct.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function updateOne(table_name, data){
    try{
        const fields_set = [];
        let pool = await sql.connect(config);
        let update = await pool.request();

        for (const [key, value] of Object.entries(data)) {
            if(key !== 'Id'){
                fields_set.push(`[${key}] =  '${value}'`);
            }
          }
          update.query(`UPDATE ${table_name} SET ${fields_set.toString()} WHERE [Id] = ${data.Id}`);
          return update.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports={
    getOrders: getOrders,
    getOrder: getOrder,
    addOrder: addOrder,
    updateOne: updateOne
}