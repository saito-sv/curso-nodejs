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
    exec (query, params) {
        return new Promise((resolve, reject) => {
            pool.query(query, params).then( res => {resolve(res)})
            .catch(err => reject(err));
        })
    }
}
