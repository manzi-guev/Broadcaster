/* eslint-disable node/no-unsupported-features/es-syntax */
import moment from 'moment';
import redflags from '../models/redflags';
import taketoken from '../helpers/token.verifier';

class redflagController {
  static create(req, res) {
    const { title, type, comment, location, status, images, videos } = req.body;
    const newRedflag = {
      id: redflags.length + 1,
      createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
      createdBy: taketoken(req.header('token')),
      title,
      type,
      comment,
      location,
      status,
      images,
      videos
    };
    redflags.push(newRedflag);
    return res.status(201).json({
      status: 201,
      message: 'Redflag successfully created',
      data: newRedflag
    });
  }

  static viewredflags(req, res) {
    const all = redflags.find(flag => flag.id);
    if (!all) {
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
}

export default redflagController;
