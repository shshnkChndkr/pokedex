const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const should = chai.should();
const { expect } = chai;

chai.use(chaiHttp);

describe('pokemonRoutes.js', () => {
  describe('GET /pokemon/translate/:name', () => {
    it('should not return translated pokemon details for invalid pokemon name', (done) => {
      chai.request(app)
        .get('/pokemon/translate/zda')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.should.have.status(404);
          done();
        });
    });
  });

  it('should not return translated pokemon details for empty pokemon name', (done) => {
    chai.request(app)
      .get('/pokemon/translate/')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });

  it('should return translated pokemon details for valid pokemon name - mewtwo', (done) => {
    chai.request(app)
      .get('/pokemon/translate/mewtwo')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });

  it('should return translated pokemon details for valid pokemon name - pikachu', (done) => {
    chai.request(app)
      .get('/pokemon/translate/pikachu')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});

describe('GET /pokemon/name/:name', () => {
  it('should not return pokemon details for invalid pokemon name', (done) => {
    chai.request(app)
      .get('/pokemon/dittooooo')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });

  it('should not return pokemon details for empty pokemon name', (done) => {
    chai.request(app)
      .get('/pokemon/')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });

  it('should return pokemon details for valid pokemon name - pikachu', (done) => {
    chai.request(app)
      .get('/pokemon/pikachu')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });

  it('should return pokemon details for valid pokemon name - mewtwo', (done) => {
    chai.request(app)
      .get('/pokemon/mewtwo')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});
