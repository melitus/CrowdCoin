import React, {useEffect} from 'react'
import { NextPage } from 'next'

import factory from '../ethereum/factory'

interface Props {
  campaigns?: Array<string>;
}

const CampaignIndex:NextPage<Props> = (props) => {
    return (
      <h1>{props.campaigns[0]}</h1>
    );
}

CampaignIndex.getInitialProps = async (ctx )  => {
   const campaigns = await factory.method.getDeployedCampaign().call()
   return {campaigns}
}