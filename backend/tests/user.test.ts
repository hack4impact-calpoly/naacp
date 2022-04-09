import { expect } from "chai";
import { app } from "../server";
import { agent as request } from "supertest";
import mongoose from "mongoose";

describe("Users", () => {
  after((done) => {
    mongoose.disconnect();
    done();
  });

  it("Get All Users", (done) => {
    request(app)
      .get("/users")
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.length).to.be.at.least(4);
        done();
      });
  });
});
