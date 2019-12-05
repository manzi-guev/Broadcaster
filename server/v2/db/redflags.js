/* eslint-disable node/no-unsupported-features/es-syntax */
import con from './connection';
import redflags from '../models/redflags';

const create = async () => {
  const createredflagTable = redflags.createRedflag;
  const tables = `${createredflagTable}`;
  await con.query(tables);
};
create();

export default create;
