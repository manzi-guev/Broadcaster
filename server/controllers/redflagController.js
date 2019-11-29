/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
import { redflags, redflag } from '../models/redflags';

class redflagController {
  static create(req, res) {
    const newRedflag = redflag.create(req);
    return res.status(201).json({
      status: 201,
      message: 'Redflag successfully created',
      data: newRedflag
    });
  }

  static viewredflags(req, res) {
    const all = redflags;
    if (all.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Redflags not found'
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Success. List of all red-flags',
      data: redflags
    });
  }

  static viewSpecificflag(req, res) {
    const found = redflag.findRedFlag(parseInt(req.params.id, 10));
    if (found) {
      return res.status(200).json({
        status: 200,
        data: found
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Redflag not found'
    });
  }

  static delete(req, res) {
    redflag.deleteRedFlag(parseInt(req.params.id, 10));
    /* istanbul ignore else */
    return res.status(200).json({
      status: 200,
      message: 'Redflag successfully deleted'
    });
  }

  static editComment(req, res) {
    const updated = redflag.commentRedflag(
      parseInt(req.params.id, 10),
      req.body.comment
    );
    return res.status(200).json({
      status: 200,
      message: 'Updated red-flag comment',
      data: {
        id: updated.id,
        comment: updated.comment
      }
    });
  }

  static editLocation(req, res) {
    const updated = redflag.locationRedflag(
      parseInt(req.params.id, 10),
      req.body.location
    );
    return res.status(200).json({
      status: 200,
      message: 'Updated red-flag location',
      data: {
        id: updated.id,
        comment: updated.location
      }
    });
  }
}

export default redflagController;
