/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
import con from '../db/connection';
import verifier from '../helpers/token.verifier';
import redflags from '../models/redflags';

const access = async (req, res, next) => {
  const email = verifier(req.header('token'));
  const id = parseInt(req.params.id, 10);
  const foundredflag = await con.query(redflags.findspecific, [id]);
  if (foundredflag.rowCount !== 1) {
    return res.status(404).json({
      status: 404,
      error: 'Redflag not found'
    });
  }
  const owner = await con.query(redflags.findowner, [email]);
  if (!owner.rowCount) {
    return res.status(403).json({
      status: 403,
      error: 'You are not the owner'
    });
  }
  next();
};

export default access;
