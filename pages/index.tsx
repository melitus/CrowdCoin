import React, {FunctionComponent, useEffect} from 'react'
import { NextPage } from 'next'
import {Card} from 'semantic-ui-react'

import factory from '../lib/factory'

interface Props {
  campaigns?: Array<string>;
}

const CampaignIndex:NextPage<Props> = (props) => {

    const renderCampaigns = () =>{
        const items = props.campaigns.map( address => {
         return {
             header: address,
             description: <a>View Campaign</a>,
             fluid: true
         }
        })
        return <Card.Group items ={items} />
    }
    return (
    <h1>{renderCampaigns}</h1>
    );
}

CampaignIndex.getInitialProps = async (ctx )  => {
    console.log({factory: factory() })
    const instance = await factory()
   const campaigns = await instance.methods.getDeployedCampaigns().call()
   console.log({campaigns, deployed: true})
   return {campaigns}
}

export default CampaignIndex