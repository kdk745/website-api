import express from 'express';
import RestController from '../controllers/RestController';

const router = express.Router();

router.get('/restaurant', RestController.listRestaurants);

router.get('/restaurant/:_id', RestController.show);

router.delete('/restaurant/:_id', RestController.remove);

router.post('/restaurant', RestController.create);

router.put('/restaurant/:_id', RestController.update);

router.put('/guestList/:_id', RestController.addGuest);

router.get('/guestList/:_id', RestController.listGuests);

export default router;
