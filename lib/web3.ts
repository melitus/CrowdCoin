import Web3 from 'web3'

declare global {
    interface Window {
        web3:any;
        ethereum: any
    }
}

let web3;

//  export async function loadWeb3() {
//      const isBrowser = () => typeof window !== "undefined"
//     if (isBrowser()) {
//       web3 = new Web3(window.ethereum)
//       await window.ethereum.enable()
//     }
//     else if (typeof window.web3 !== "undefined") {
//       web3 = new Web3(window.web3.currentProvider)
//     }
//     else {
//       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
//     }
//           return web3
//   }



const isBrowser = () => typeof window !== "undefined"

 export async function loadWeb3() {

 if (isBrowser()) {
        if(window.web3 !== 'undefined'){
            const provider = new Web3.providers.HttpProvider(
                'http://localhost:8545'
                );
            web3 = new Web3(provider);
        } else if(window.ethereum){
          web3 = new Web3(window.ethereum)
          await window.ethereum.enable() // Prompt user to let our DApp access their addresses
        }else{
            web3 = new Web3(window.web3.currentProvider);
        }
    } else {
       const localProvider = `http://localhost:8545`
    const provider = new Web3.providers.HttpProvider(localProvider)
    web3 = new Web3(provider)
    }
      return web3
 }
    export default web3;
