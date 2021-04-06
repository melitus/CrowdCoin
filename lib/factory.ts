import {loadWeb3} from './web3'
import CampaignFactory from '../abis/CampaignFactory.json'

const getContractInstance = async () => {
   const abi = CampaignFactory.abi;
   const web3 = await loadWeb3()
   const networkId = await web3.eth.net.getId()
   const deployedNetwork = CampaignFactory.networks[networkId]
   const campaignInstance = new web3.eth.Contract(abi,deployedNetwork.address)

   return campaignInstance
}

export default getContractInstance

