import  pg  from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const Pool = pg.Pool;

export const pool = new Pool({connectionString: process.env.PG_URI, ssl:{rejectUnauthorized:false}});

