import express from 'express';
import RestController from '../controllers/RestController';

const router = express.Router();
router.get('/restaurant', function (request, response, next) {
  RestController.list(request, response, next);
});

router.get('/restaurant/:_id', function (request, response, next) {
  RestController.show(request, response, next);
});

router.delete('/restaurant/:_id', function (request, response, next) {
  RestController.remove(request, response, next);
});

router.post('/restaurant', function (request, response, next) {
  RestController.create(request, response, next);
});

router.put('/restaurant/:_id', function (request, response, next) {
  RestController.update(request, response, next);
});

export default router;
