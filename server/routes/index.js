import express from 'express';
import db from '../data/rides';
import usersDb from '../data/users';
import requestsDb from '../data/requests';

const router = express.Router();

// INDEX - displays a list of ride offers
router.get('/rides', (req, res) => {
  res.json(db);
});

// SHOW - displays more information about one ride offer
router.get('/rides/:id', (req, res) => {
  // find the ride offer with provided ID
  const ride = db.find(rideInDb => rideInDb.id === Number(req.params.id));
  if (!ride) {
    return res.json({
      message: 'Ride not found',
    });
  }
  res.json(ride);
});

// New - create new ride
router.post('/rides', (req, res) => {
  const { from, to, departure } = req.body;
  const lastRide = db[db.length - 1];
  const newRide = {
    id: lastRide.id + 1,
    from,
    to,
    departure,
  };
  db.push(newRide);
  res.status(201).json({
    message: 'Ride offer created successfully.',
  });
});

router.post('/rides/:id/requests', (req, res) => {
  // req.body: user_id
  const user = usersDb.find(userFromDb => userFromDb.id === Number(req.body.user_id));
  const ride = db.find(rideFromDb => rideFromDb.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({
      message: 'A user with that id was not found.',
    });
  }

  if (!ride) {
    return res.status(404).json({
      message: 'A ride with that id was not found.',
    });
  }
  const newRequest = {
    ride_id: req.params.id,
    user_id: req.body.user_id,
  };

  requestsDb.push(newRequest);

  res.json({
    message: 'request made successfully.',
  });
});

export default router;
