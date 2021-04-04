import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const contractAddress = 'xcdjfkkj54589kfjdkjfkdhf'
const abi = JSON.parse(CampaignFactory.interface);

const instance = new web3.eth.Contract(abi,contractAddress)

export default instance