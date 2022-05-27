const chai = require('chai');

let server = require('../server');

let should = chai.should();


describe('GET/form/bookings', () => {

    it('it Should GET the Booking Id', (done) => {

      chai.request(server)

        .get('/form/bookings')

        .end((err, response) => {

          response.should.have.status(200);

          done();

        });

    });

  });

  describe('GET /checkcancel',()=>{

    it('it Should GET the checkout', (done) => {

      chai.request(server)

        .get('/checkcancel')

        .end((err, response) => {

          response.should.have.status(200);

          done();

        });

    });

  });