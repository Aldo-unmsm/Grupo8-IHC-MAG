import myqsl from 'promise-mysql';

import keys from './keys';

const pool = myqsl.createPool(keys.database);

pool.getConnection().then( connection => {
    pool.releaseConnection(connection);
    console.log('BD conectada');
});

export default pool;