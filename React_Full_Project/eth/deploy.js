const Web3 = require('web3');
//const ganache = require('ganache-cli');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const {interface,bytecode} = require('./compile');
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Deploying to ', accounts[0]);
  const results = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({gas: '1000000', from:accounts[0]});
  console.log(interface);
  console.log("Deployed at address", results.options.address);
}
deploy();
