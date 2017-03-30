import RestModel from '../models/RestModel';
const RestController = {};


RestController.list = function (request, response, next) {
  RestModel.find().exec()
    .then(rests => {
      return response.json(rests);
    })
    .catch(err => {
      return next(err);
    });
};

RestController.show = function (request, response, next) {
  RestModel.findById(request.params._id).exec()
    .then(rest => {
      return response.json(rest);
    })
    .catch(err => {
      return next(err);
    });
};

RestController.create = function (request, response, next) {

  const rest = new RestModel({
    credentials: request.body.credentials,
    info: request.body.info,
    booked: request.body.booked,
  });

  rest.save()
    .then(newRest => {
      return response.json(newRest);
    })
    .catch(err => {
      return next(err);
    });

};

RestController.update = function (request, response, next) {
  RestModel.findById(request.params._id)
    .then(rest => {
      rest.credentials = request.body.credentials || rest.credentials;
      rest.info = request.body.info || rest.info;
      rest.booked = request.body.booked || rest.booked;

      return rest.save();
    })
    .then(rest => {
      return response.json(rest);
    })
    .catch(err => {
      return next(err);
    });
};

RestController.remove = function (request, response, next) {
  RestModel.findByIdAndRemove(request.params._id).exec()
    .then(rest => {
      return response.json(rest);
    })
    .catch(err => {
      return next(err);
    });
};

export default RestController;
