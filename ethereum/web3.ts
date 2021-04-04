import Web3 from 'web3'

declare global {
    interface Window {
        web3:any;
    }
}

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
// we are in the browser and metamask is running
 const provider = window.web3.currentProvider()
 web3 = new Web3(provider)

} else {
    // we are on the server or the user is not running metamask
    const url = 'https://rinkeby.infura.io/ndfjfd'
    const provider = new Web3.providers.HttpProvider(url)
    web3 = new Web3(provider)
}


export default web3