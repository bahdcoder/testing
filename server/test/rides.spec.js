import chai from 'chai';
import supertest from 'supertest';

import app from '../index';
import db from '../data/rides';

const { expect } = chai;

const server = supertest(app);

describe('the /rides endpoint', () => {
  it('should return a list of all rides', async () => {
    const response = await server.get('/api/v1/rides');

    expect(response.status).to.equal(200);
    expect(db.length).to.equal(response.body.length);
  });
  it('should create a ride and save into database', async () => {
    const newRide = {
      from: 'ibadan',
      to: 'lekki',
      departure: '2018-09-09 00:00:00',
    };
    const numberOfRidesBefore = db.length;

    const response = await server.post('/api/v1/rides').send(newRide);

    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal('Ride offer created successfully.');
    expect(db.length).to.equal(numberOfRidesBefore + 1);
  });
});
