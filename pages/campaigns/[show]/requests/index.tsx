import React from 'react'
import {Button} from 'semantic-ui-react'
import Link from 'next/link'

import Layout from '../../../../components/Layout'

const RequestIndex = (props) => {
  return (
    <Layout>
      <h3>Request list</h3>
      <Link href={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
    </Layout>
  )
}

RequestIndex.getInitialProps = async (props) => {
  const {show} = props.query as any
  return {
    address: show,
  }
}

export default RequestIndex
