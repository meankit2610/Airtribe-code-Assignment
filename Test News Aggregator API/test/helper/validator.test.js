const expect = require("chai").expect;
const validator = require("../../helper/validator");

let userInfo = {
  fullName: "Singh1",
  email: "singh1@1.com",
  password: "singh1",
  prefrences: ["comedy"],
};

describe("Testing the Validator", function () {
  it("1. Validating the UserInfo", function (done) {
    let response = validator.validateSignUp(userInfo);
    expect(response.status).equal(true);
    expect(response.message).equal("User Added");
    done();
  });
});
