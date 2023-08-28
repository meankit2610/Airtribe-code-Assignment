class validator {
  static validateSignUp(userInfo) {
    if (
      userInfo.hasOwnProperty("fullName") &&
      userInfo.hasOwnProperty("email") &&
      userInfo.hasOwnProperty("password") &&
      userInfo.hasOwnProperty("prefrences")
    ) {
      return {
        status: true,
        message: "User Added",
      };
    }

    return {
      status: false,
      message: "Provide all Required details",
    };
  }
}

module.exports = validator;
