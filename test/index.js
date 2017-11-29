require('dotenv').config();

var chai = require('chai'),
    should = chai.should,
    expect = chai.expect,
    awsSynch = require('../index'),
    synchToS3 = awsSynch.synchToS3,
    synchFromS3 = awsSynch.synchFromS3,
    data = require("./data");


// console.log("---> BUCKET_NAME", process.env.BUCKET_NAME);
// console.log(JSON.stringify(data));

describe("#synchToS3", function() {

  describe("Invalid Data Cases", function() {
    Object.keys(data.synchToS3.invalid).forEach(function(field) {
      Object.keys(data.synchToS3.invalid[field]).forEach(function(scenerio) {
        it(`when #${field} is #${scenerio}`, function(done) {
            var params = data.synchToS3.invalid[field][scenerio]();
            // console.log(scenerio, params);
            synchToS3(params, (err, results) => {
              // console.log(JSON.stringify(err));
              expect(err).to.not.equal(null);
              expect(err.details[0].context.key).to.be.equal(field);
              done();
            });
        });
      });
    });
  });

  describe("Valid All", function() {
    if (process.env.BUCKET_NAME) {
      it("when all data is valid", function(done) {
        this.timeout(5000);
        var params = data.synchToS3.valid.case1();
        console.log(params);
        synchToS3(params, function(err, results) {
          expect(err).to.be.equal(undefined);
          done();
        });
      });
    }
  });

});

describe("#synchFromS3", function() {

  describe("Invalid Data Cases", function() {
    Object.keys(data.synchFromS3.invalid).forEach(function(field) {
      Object.keys(data.synchFromS3.invalid[field]).forEach(function(scenerio) {
        it(`when #${field} is #${scenerio}`, function(done) {
            var params = data.synchFromS3.invalid[field][scenerio]();
            // console.log(scenerio, params);
            synchFromS3(params, (err, results) => {
              // console.log(JSON.stringify(err));
              expect(err).to.not.equal(null);
              expect(err.details[0].context.key).to.be.equal(field);
              done();
            });
        });
      });
    });
  });

  describe("Valid All", function() {
    if (process.env.BUCKET_NAME) {
      it("when all data is valid", function(done) {
        this.timeout(5000);
        var params = data.synchFromS3.valid.case1();
        // console.log(params);
        synchFromS3(params, function(err, results) {
          expect(err).to.be.equal(undefined);
          done();
        });
      });
    }
  });

});