/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
import moment from 'moment';
import taketoken from '../helpers/verifyToken';
import con from '../db/connection';
import redflags from '../models/redflags';

class redflagController {
  static async create(req, res) {
    const { title, comment, location, images, videos } = req.body;
    const createdOn = moment().format('MMMM Do YYYY, h:mm:ss a');
    const createdBy = taketoken(req.header('token'));
    const type = 'Redflag';
    const status = 'pending...';
    const newRedflag = await con.query(redflags.insertRedflag, [
      createdOn,
      createdBy,
      title,
      type,
      comment,
      location,
      status,
      images,
      videos
    ]);
    /* istanbul ignore else */
    if (newRedflag.rowCount === 1) {
      return res.status(201).json({
        status: 201,
        message: 'Redflag successfully created',
        data: newRedflag.rows[0]
      });
    }
  }

  static async viewredflags(req, res) {
    const viewredflags = await con.query(redflags.findredflags);
    /* istanbul ignore else */
    if (viewredflags.rowCount >= 1) {
      return res.status(200).json({
        status: 200,
        message: 'Success. List of all red-flags',
        data: viewredflags.rows
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Redflags not found'
    });
  }

  static async viewSpecificflag(req, res) {
    const id = parseInt(req.params.id, 10);
    const viewspecific = await con.query(redflags.findspecific, [id]);
    /* istanbul ignore else */
    if (viewspecific.rowCount === 1) {
      return res.status(200).json({
        status: 200,
        data: viewspecific.rows
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Redflag not found'
    });
  }

  static async delete(req, res) {
    const id = parseInt(req.params.id, 10);
    const viewspecific = await con.query(redflags.deleteredflag, [id]);
    /* istanbul ignore else */
    if (viewspecific.rowCount === 1) {
      return res.status(200).json({
        status: 200,
        message: 'Redflag successfully deleted'
      });
    }
  }

  static async editLocation(req, res) {
    const { location } = req.body;
    const id = parseInt(req.params.id, 10);
    const viewspecific = await con.query(redflags.updatelocation, [
      id,
      location
    ]);
    /* istanbul ignore else */
    if (viewspecific.rowCount === 1) {
      return res.status(200).json({
        status: 200,
        message: 'Updated red-flag location',
        data: {
          id: id,
          location: location
        }
      });
    }
  }

  static async editComment(req, res) {
    const { comment } = req.body;
    const id = parseInt(req.params.id, 10);
    const viewspecific = await con.query(redflags.updatecomment, [id, comment]);
    /* istanbul ignore else */
    if (viewspecific.rowCount === 1) {
      return res.status(200).json({
        status: 200,
        message: 'Updated red-flag comment',
        data: {
          id: id,
          comment: comment
        }
      });
    }
  }

  static async editStatus(req, res) {
    const { status } = req.body;
    const id = parseInt(req.params.id, 10);
    const viewspecific = await con.query(redflags.updatestatus, [id, status]);
    /* istanbul ignore else */
    if (viewspecific.rowCount === 1) {
      return res.status(200).json({
        status: 200,
        message: 'Changed red-flag status',
        data: {
          id: id,
          status: status
        }
      });
    }
  }
}
export default redflagController;
