import  pg  from 'pg';
const Pool = pg.Pool;

export const pool = new Pool({connectionString: process.env.PG_URI});
