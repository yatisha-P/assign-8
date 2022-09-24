const UsersModel = require("../models/UsersModel");
const UsersController = {
  userSignUp: async function (request, response) {
    let data = request.body;
    // insert user
    try {
      const newUser = new UsersModel({
        email: data.email,
        password: data.password,
        firstname: data.firstname ? data.firstname : undefined,
        lastname: data.lastname ? data.lastname : undefined,
      });

      let result = await UsersModel.findOne({ email: data.email });
      // check already exist email
      if (result) {
        response.status(200).send({
          status: false,
          message: "Email id is already exist, user other email id",
        });
      } else {
        let saveResult = await newUser.save();
        response.status(200).send({
          status: true,
          result: saveResult,
        });
      }
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  }
}

module.exports = UsersController;