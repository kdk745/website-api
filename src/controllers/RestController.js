import RestModel from '../models/RestModel';
import GuestListModel from '../models/GuestListModel';

function listRestaurants(request, response, next) {
  RestModel.find().exec()
    .then(rests => {
      return response.json(rests);
    })
    .catch(err => {
      return next(err);
    });
}

function listGuests(request, response, next) {
  GuestListModel.findById(request.params._id).exec()
    .then(guestList => {
      return response.json(guestList);
    })
    .catch(err => {
      return next(err);
    });
}

function show(request, response, next) {
  RestModel.findById(request.params._id).exec()
    .then(rest => {
      return response.json(rest);
    })
    .catch(err => {
      return next(err);
    });
}

function addGuest(request, response, next) {
  GuestListModel.findById(request.params._id)
    .then(list => {
      const currentList = [...list._list];
      currentList.push(request.body.listItem);
      list._list = currentList;
      return list.save();
    })
    .then(list => {
      return response.json(list);
    })
    .catch(err => {
      return next(err);
    });
}

function create(request, response, next) {

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

}

function update(request, response, next) {
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
}

function remove(request, response, next) {
  RestModel.findByIdAndRemove(request.params._id).exec()
    .then(rest => {
      return response.json(rest);
    })
    .catch(err => {
      return next(err);
    });
}

function signup(request) {
  console.log(request.body.credentials);
}

const RestController = {
  listRestaurants,
  listGuests,
  show,
  addGuest,
  create,
  update,
  remove,
  signup
};

export default RestController;
