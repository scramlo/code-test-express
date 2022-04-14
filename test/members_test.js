process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var knex = require('../db/knex');
var server = require('../index');

chai.use(chaiHttp);

beforeEach(function (done) {
  knex.migrate.latest().then(function () {
    return knex.seed.run().then(function () {
      done();
    });
  });
});

describe('GET /members', function () {
  it('should return all subscriptions with correct data', function (done) {
    chai.request(server).get('/api/members').end(function (err, res) {
      expect(res.body.subscriptionsWithCount).to.be.a('array');
      expect(res.body.subscriptionsWithCount.length).to.equal(3);
      expect(res.body.subscriptionsWithCount[0]).to.have.property('memberCount');
      done();
    });
  });

  it('should return all members with correct data', function (done) {
    chai.request(server).get('/api/members').end(function (err, res) {
      expect(res.body.membersWithSubscriptions).to.be.a('array');
      expect(res.body.membersWithSubscriptions.length).to.equal(10);
      expect(res.body.membersWithSubscriptions[0]).to.have.property('subscription');
      done();
    });
  });
});
