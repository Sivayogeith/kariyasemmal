const config = {
  user: "Sivayogeith",
  password: "0qeJWqHl8G0Rlc6f",
  cluster: "fun.eoxfd.mongodb.net",
  database: "YogiAngular",
};
const uri = `mongodb+srv://${config.user}:${config.password}@${config.cluster}/${config.database}?authSource=admin&ssl=true`;
const jwtKey =
  "lasbawQtxkdYertgwJG4pb5rNLCtmD41OCablLBdEnonMRFlO3kjwXlqc2iMdjj5c4Q0JZq";

const notifications = {
  newUser: (name) => `Hello ${name}, Welcome to Kariyasemmal!`,
};
module.exports = { config, uri, jwtKey, notifications };
