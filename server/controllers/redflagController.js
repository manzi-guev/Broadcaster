/* eslint-disable node/no-unsupported-features/es-syntax */
import redflags from '../models/redflags';

class redflagController {
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
