import {loadWeb3} from './web3'
import Campaign from '../abis/Campaign.json'

const getCampaignInstance = async (address) => {
    console.log({address})
   const abi = Campaign.abi;
   const web3 = await loadWeb3()
   const campaignInstance = new web3.eth.Contract(abi,address)

   return campaignInstance
}

export default getCampaignInstance

