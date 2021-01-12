import {pool} from './pool.js';

pool.on('connect', () => {
    console.log("DB Connected");
});

export default {
    /**
     * 
     * @param {String} query 
     * @param {Array?} params 
     * @returns {Promise} the result of the query
     */
    exec (query, ...params) {
        return pool.query(query, [...params])
    }
}
