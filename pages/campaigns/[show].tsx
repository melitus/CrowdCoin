import React from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import {Card} from 'semantic-ui-react'

import Layout from '../../components/Layout'
import getCampaignInstance from '../../lib/campaign'
import {loadWeb3} from '../../lib/web3'

interface Props {
  minimumContribution?: string;
  balance?: string;
  requestCount?: string;
  approvalCount?: string;
  manager?: string;

}


const ShowCampaign:NextPage<Props> = (props) => {
    const router = useRouter()
  const { show } = router.query
   const {
       minimumContribution,
       balance,
       requestCount,
       approvalCount,
       manager
   } = props

      const items = [
          {
              header:manager,
              meta:'Address of Manager',
              description: 'The Manager created this campaign',
              style: {overflowWrap: 'break-word'}
          },
           {
              header:minimumContribution,
              meta:'Minimum contribution in (wei)',
              description: 'You must contribute this amount of wei to become approved',
          },
           {
              header:requestCount,
              meta:'Number of request',
              description: 'A request tries to withdraw money from the contract',
          },
          {
              header:approvalCount,
              meta:'Number of approvers',
              description: 'Number of people who have already donated to this campaign',
          },
           {
              header:balance,
              meta:'Campaign Balance',
              description: 'The balance is how much money this campaign has left to spend',
          }
      ]

  return (
      <Layout>
          <p>Campaign Show</p>
          <Card.Group items ={items} />
      </Layout>
  )
}


ShowCampaign.getInitialProps = async (props)  => {
    const {show} = props.query
    const campaign = await getCampaignInstance(show)
    const summary = await campaign.methods.getSummary().call()
    const web3 = await loadWeb3()
   return {
       minimumContribution: summary[0],
       balance: web3.util.fromWei(summary[1],'ether'),
       requestCount: summary[2],
       approvalCount: summary[3],
       manager: summary[4]
   }
}

export default ShowCampaign