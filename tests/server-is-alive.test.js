const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { url, port } = require("config").get("server");
const serverBaseUrl = `${url}:${port}`;

chai.use(chaiHttp);

describe("Health test", function () {
  it("server is alive", function (done) {
    chai
      .request(serverBaseUrl)
      .get("/_health")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("healthy");
        done();
      });
  });
});
