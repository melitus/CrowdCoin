import React from 'react'
import {NextPage} from 'next'
import {Card, Button} from 'semantic-ui-react'
import Link from 'next/link'

import factory from '../lib/factory'
import Layout from '../components/Layout'

interface Props {
  campaigns?: Array<string>
}

const CampaignIndex: NextPage<Props> = (props) => {
  const items = props.campaigns.map((address) => {
    return {
      header: address,
      description: (
        <Link href={`campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    }
  })
  return (
    <Layout
      head={{
        title: 'Campaign Index',
        description: 'Browse to open new campaign for crowdCoin dapp.',
        canonical: '/',
      }}
      noLanding={true}
    >
      <h3>Open Campaigns</h3>
      <Link href="/campaigns/new">
        <a>
          <Button
            content="Create Campaign"
            floated="right"
            icon="add circle"
            primary
          />
        </a>
      </Link>
      <Card.Group items={items} />
    </Layout>
  )
}

CampaignIndex.getInitialProps = async () => {
  const instance = await factory()
  const campaigns = await instance.methods.getDeployedCampaigns().call()

  return {campaigns}
}

export default CampaignIndex
