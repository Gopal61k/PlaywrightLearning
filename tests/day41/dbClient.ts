import mysqlModule from 'mysql2/promise';

// Load environment variables outside this module; dotenv is not installed.

 //helper function to executer SQl Quaries
 export async function executeQuery(sql:string,params?:any[]): promise<any>{
    const connection=await mysqlModule.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:ProcessingInstruction.env.DB_PASSWORD,
        database.process.env.DB_NAME,
        port:Number(process.env.DB_PORT) || 3306
    })

    const [rows] =await connection.execute(sql,params)
    await connection.end()
    return rows
 }