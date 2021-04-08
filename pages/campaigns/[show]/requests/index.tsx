/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import {Button, Table} from 'semantic-ui-react'
import Link from 'next/link'

import Layout from '../../../../components/Layout'
import getCampaignInstance from '../../../../lib/campaign'
import RequestList from '../../../../components/RequestList'
// import {loadWeb3} from '../../lib/web3'

const RequestIndex = (props) => {
  const {Header, Row, HeaderCell, Body} = Table

  const renderRequestList = () => {
    return props.requests.map((request, index) => {
      return (
        <RequestList
          key={index}
          id={index}
          request={request}
          address={props.address}
        />
      )
    })
  }
  return (
    <Layout>
      <h3>Request list</h3>
      <Link href={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Accounts</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRequestList()}</Body>
      </Table>
    </Layout>
  )
}

RequestIndex.getInitialProps = async (props) => {
  const {show} = props.query as any
  const campaign = await getCampaignInstance(show)
  const requestCount = await campaign.methods.getRequestsCount().call()
  const requests = await Promise.all(
    Array(Number(requestCount))
      .fill(0)
      .map((element, index) => {
        return campaign.methods.requests(index).call()
      }),
  )

  return {
    address: show,
    requests,
    requestCount,
  }
}

export default RequestIndex
