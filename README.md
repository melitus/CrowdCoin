# CrowdCoin

# ethereum-kickstarter-project

Allows you to create and manage campaigns in Rinkeby network using ethereum smart contracts.


## Technology stack:

 - <b>Truffle</b> - ( development framework for dapps based on the Ethereum blockchain: https://truffleframework.com/),
 - <b>Ganache</b> - ( A personal blockchain for Ethereum development that can be used to deploy contracts, develop applications, and run tests: https://truffleframework.com/ganache),
 - <b>Solidity</b> - (contract-oriented programming language for writing smart contracts: https://solidity.readthedocs.io/en/v0.4.24/),
 - <b>Web3.js</b> - (Ethereum JavaScript API: https://github.com/ethereum/web3.js/)
- <b>Truffle Contract</b> -(Better Ethereum contract abstraction, for Node and the browser):https://www.npmjs.com/package/@truffle/contract
 - <b>MetaMask</b> - (A browser plugin which allows users to make transactions to Ethereum or other networks through browsers, eliminating the need for dedicated user interfaces for Ethereum or other networks: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
 - <b>OpenZeppelin Contracts</b> - OpenZeppelin Contracts is a library for secure smart contract development: https://github.com/OpenZeppelin/openzeppelin-contracts
 - <b>NodeJS</b> - (An open source and cross-platform runtime environment for executing JavaScript code outside of a browser: https://nodejs.org/en/),
 -  [Semantic UI](https://react.semantic-ui.com/) - User Interface
 - [Next JS](https://nextjs.org/) - Server Rendered Apps

## Pre-Requisites

You need to install [metamask browser extension](https://metamask.io/) and create an account.

Once your account is ready, you need to add some ether balance using [Rinkeby Authenticated Faucet](https://faucet.rinkeby.io/).

In the absence of metamask, the project will fallback to using [Infura node](https://infura.io/) to access Rinkeby network.


 ## Set Up
 ### Install truffle
  - Run the command `npm install -g truffle`
  - Git clone the E-cert-Dapp repo
  - Cd into the directory and run ` yarn install`
  - Run ` yarn run compile` to compile the smart contract
  - Run `yarn run migrate` to migrate the contract. `truffle deploy` is an alias for `truffle migrate`. They both do the same thing.
  - Run `yarn run console` to interact with the smart contract on the ganache ethereum blockchain

  ### Install Ganache
 - Go to https://truffleframework.com/ganache and download a version dedicated to your operating system.
 - Install by a double click, then run.
 - Ganache runs with default values which should be the same or similar to these on-screen. The crucial part is a section defining RPC Server.
 - Leave it running.

 ### Install Nodejs
 - To download Nodejs, navigate to  navigate to https://nodejs.org/en/download/ and click the version that suits your machine
 - After downloading it, click the installer to get it installed on your machine
 - Verify installation by running the command on your CLI ` node -v`
 - You can use npm or yarn for package management

### Testing Results
- Open a terminal and run:
 `truffle test or yarn run test`


![Alt text](./diagrams/test-results.png?raw=true "Test results")

### Test Coverage Results
- Open a terminal and run:
 `truffle run coverage or yarn run coverage`

![Alt text](./diagrams/test-coverage.png?raw=true "Test coverage results")


### Contract deployment gas cost on local network - Ganache
- Open a terminal and run:
 `truffle run migrate or yarn run migrate`

![Alt text](./diagrams/cost-local.png?raw=true "gas cost")


### Contract deployment gas cost on ropsten network - testnet on infuria
- Open a terminal and run:
 `truffle run ropsten or yarn run ropsten`

![Alt text](./diagrams/cost-ropsten.png?raw=true "gas cost")

### Contract deployment gas cost fee on ropsten etherscan explorer
- Open a terminal and run:
 `truffle run ropsten or yarn run ropsten`

![Alt text](./diagrams/etherscan.png?raw=true "gas cost")
- link: https://ropsten.etherscan.io/address/0x0268B3D69FbD4b83F2a51E579ed0953f7a8775E2


### Contract Graph
- Use Solidity Visual Developer to generate the graph for the contract

![Alt text](./diagrams/contractGraph.png?raw=true "Test coverage results")



### Contract UML Diagram
- Use Solidity Visual Developer to generate the UML with PlantUML embedded

![Alt text](./diagrams/contract-uml.png?raw=true "Test coverage results")


## Smart Contract

Campaign contract is deployed at address `0x2280cB3780CACe8da81dF119f9af16F3aF73c02A` and is available inside the contracts folder.

Our app will interact with the deployed contract to create campaigns.

## Running the project

```
npm run dev
```

Go to browser at address http://localhost:3000 to access the web page.

Next JS performs server side rendering of the pages and hot reloading as you make any changes to the code.

## Operations

### Create Campaign

You can create a campaign by specifying a minimum contribution required.

Once the campaign is created, you become the manager of the campaign and will be able to create requests which needs to be approved by the contributors.

Any user who contributes below the requirement for the campaign will have their transaction rejected.

### View Campaign

Shows details of the campaign such as address of the account which created the campaign, minimum contribution required, campaign balance, number of people who have donated for the campaign and number of requests created by the manager.

### Contribute

Allows you to contribute to the campaign.

### View Requests

List the requests created by the manager for the campaign.

Contributors can approve the requests.

Once the approval criteria is met, the manager can finalize the request for payment to the recipient.

### Add Request

Manager of a campaign can create a request which will be fulfilled by the recipient.

Once more than 50% of the campaign contributors approve the request, the manager can finalize the payment to the vendor.