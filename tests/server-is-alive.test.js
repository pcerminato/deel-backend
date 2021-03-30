const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { BASE_URI } = require("./constants");

chai.use(chaiHttp);

describe("Health test", function () {
  it("server is alive", function (done) {
    chai
      .request(BASE_URI)
      .get("/_health")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("healthy");
        done();
      });
  });
});
