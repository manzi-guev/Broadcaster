/* eslint-disable node/no-unsupported-features/es-syntax */
import con from './connection';

const dropTables = async () => {
  await con.query('DROP TABLE redflags');
  await con.query('delete from users');
};
dropTables();
export default dropTables;
