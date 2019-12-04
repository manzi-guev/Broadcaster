/* eslint-disable node/no-unsupported-features/es-syntax */
import moment from 'moment';
import taketoken from '../helpers/verifyToken';

const redflags = [];

class redflag {
  static create(req) {
    const { title, type, comment, location, status, images, videos } = req.body;
    let id;
    if (redflags.length === 0) {
      id = 1;
    } else {
      id = redflags[redflags.length - 1].id + 1;
    }
    const newRedflag = {
      id: id,
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
    return newRedflag;
  }

  static findRedFlag(id) {
    const found = redflags.find(flag => flag.id === id);
    return found;
  }

  static deleteRedFlag(id) {
    const found = this.findRedFlag(id);
    redflags.splice(redflags.indexOf(found), 1);
  }

  static commentRedflag(id, comment) {
    const found = this.findRedFlag(id);
    found.comment = comment;
    return found;
  }

  static locationRedflag(id, location) {
    const found = this.findRedFlag(id);
    found.location = location;
    return found;
  }
}

export { redflags, redflag };
