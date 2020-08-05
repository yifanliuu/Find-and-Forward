
const Protocol = artifacts.require("Protocol");
const User = artifacts.require("User");

module.exports = function (deployer) {
  deployer.deploy(Protocol);
  deployer.deploy(User);
};
