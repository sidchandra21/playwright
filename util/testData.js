const testData = {
  users: [
    {
      username: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
      productname: "ZARA COAT 3"
    },
    {
      username: process.env.SECONDARY_EMAIL,
      password: process.env.SECONDARY_PASSWORD,
      productname: "ADIDAS ORIGINAL"
    }
  ]
};

module.exports = { testData };