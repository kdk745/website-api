import express from 'express';
import GuestController from '../controllers/GuestController';

const router = express.Router();

router.get('/guests/:_id', function (request, response, next) {
  GuestController.show(request, response, next);
});

router.delete('/guests/:_id', function (request, response, next) {
  GuestController.remove(request, response, next);
});

router.post('/guests', function (request, response, next) {
  GuestController.create(request, response, next);
});

router.put('/guests/:_id', function (request, response, next) {
  GuestController.update(request, response, next);
});

export default router;
