import React from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import Layout from '../../components/Layout'
import getCampaignInstance from '../../lib/campaign'

const ShowCampaign:NextPage = () => {
    const router = useRouter()
  const { show } = router.query

  return (
      <Layout>
          <p>Campaign Detail: {show}</p>
      </Layout>
  )
}


ShowCampaign.getInitialProps = async (props)  => {
    console.log({querry: props.query})
    const {show} = props.query
    console.log({atinit: show})
    const campaign = await getCampaignInstance(show)
    console.log({campaign})
    const summary = await campaign.methods.getSummary().call()
    console.log(summary)

   return {}
}

export default ShowCampaign