const Campaign = artifacts.require("Campaign");
const CampaignFactory = artifacts.require("CampaignFactory");

// to deploy on localhost
// module.exports = function(deployer) {
//  deployer.deploy(CampaignFactory);
// };

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(CampaignFactory)
  await deployer.deploy(Campaign, '100000000', accounts[0] );
};


// module.exports = function (deployer) {
//     deployer
// 	 // Deploy both contracts
//         .deploy(Application, Storage)
//         .then(() => {
//                 Application
// 		    // get deployed instance
//                     .deployed()
//                     .then(instance => {
// 			// call functions for updating dependencies addresses
//                         instance.setStorageAddress(Storage.address);
//                     });
//             }
//         );

// };

// deployer.deploy(Factory).then(async () => {
//                 const factory = await Factory.new();
//                 const cash = await Cash.new();
//                 await factory.createToken(cash.address, web3.utils.utf8ToHex("USD"),
//                 web3.utils.utf8ToHex("Cash"));  await factory.createToken(cash.address,
//                 web3.utils.utf8ToHex("EUR"), web3.utils.utf8ToHex("Cash"));});


// 3_deploy_the_kids.js:
// factory = await Factory.deployed();
// await factory.createNewChildContract();
// await factory.createNewChildContract();
// await factory.createNewChildContract();

// module.exports = function(deployer) {
// 	// deploy the first
// 	deployer.deploy(MyERC20);

// 	// get the owner address
// 	const accounts = await web3.eth.getAccounts();
// 	const owner = accounts[0];
// 	// deploy the second, with address parameter
// 	deployer.deploy(SecondERC20, owner);
// };