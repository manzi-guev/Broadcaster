/* eslint-disable node/no-unsupported-features/es-syntax */
import con from './connection';
import users from '../models/users';

const create = async () => {
  const createUserTable = users.createUser;
  const insertadmin = users.insertAdmin;
  const tables = `${createUserTable}; ${insertadmin}`;
  await con.query(tables);
};
create();

export default create;
