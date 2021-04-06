import React, {FunctionComponent, useEffect} from 'react'
import { NextPage } from 'next'
import {Card, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import factory from '../lib/factory'
import Layout from '../components/Layout'

interface Props {
  campaigns?: Array<string>;
}

const CampaignIndex:NextPage<Props> = (props) => {
        const items = props.campaigns.map( address => {
         return {
             header: address,
             description: <a>View Campaign</a>,
             fluid: true
         }
        })
    return (
        <Layout>
        <>
            <h3>Open Campaigns</h3>
            <Button
              content="Create Campaign"
              floated="right"
              icon="add circle"
              primary
            />
            <Card.Group items ={items} />
         </>
         </Layout>
            );
}

CampaignIndex.getInitialProps = async (ctx )  => {
    const instance = await factory()
   const campaigns = await instance.methods.getDeployedCampaigns().call()

   return {campaigns}
}

export default CampaignIndex