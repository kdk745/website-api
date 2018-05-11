import GuestModel from '../models/GuestModel';

function show(request, response, next) {
  GuestModel.findById(request.params._id).exec()
    .then(Guest => {
      return response.json(Guest);
    })
    .catch(err => {
      return next(err);
    });
}

function create(request, response, next) {

  const Guest = new GuestModel({
    credentials: request.body.credentials,
    info: request.body.info
  });

  Guest.save()
    .then(newGuest => {
      return response.json(newGuest);
    })
    .catch(err => {
      return next(err);
    });

}

function update(request, response, next) {
  GuestModel.findById(request.params._id)
    .then(Guest => {
      Guest.credentials = request.body.credentials || Guest.credentials;
      Guest.info = request.body.info || Guest.info;

      return Guest.save();
    })
    .then(Guest => {
      return response.json(Guest);
    })
    .catch(err => {
      return next(err);
    });
}

function remove(request, response, next) {
  GuestModel.findByIdAndRemove(request.params._id).exec()
    .then(Guest => {
      return response.json(Guest);
    })
    .catch(err => {
      return next(err);
    });
}

const GuestController = {
  show,
  create,
  update,
  remove
};

export default GuestController;
