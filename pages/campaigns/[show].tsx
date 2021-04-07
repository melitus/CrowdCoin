import React from 'react'
import { useRouter } from 'next/router'

import Layout from '../../components/Layout'

const ShowCampaign = () => {
    const router = useRouter()
  const { show } = router.query

  return (
      <Layout>
          <p>Campaign Detail: {show}</p>
      </Layout>
  )
}

export default ShowCampaign