/* eslint-disable import/no-useless-path-segments */
/* eslint-disable node/no-unsupported-features/es-syntax */
import con from '../db/connection';
import users from '../models/users';

const create = async () => {
  const createUserTable = users.createUser;
  const tables = `${createUserTable}`;
  await con.query(tables);
};
create();

export default create;