/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {useState, useEffect} from 'react'
import {Button, Message, Table} from 'semantic-ui-react'
import {useRouter} from 'next/router'

import {loadWeb3} from '../lib/web3'
import getCampaignInstance from '../lib/campaign'

// import {loadWeb3} from '../lib/web3'

interface IProps {
  key: string
  id: string
  request: request
  address: string
  approversCount: any
}

type request = {
  description: string
  value: string
  approvalCount: any
  recipient: string
  complete?: string
}

const RequestList: React.FunctionComponent<IProps> = (props) => {
  //   const web3 = await loadWeb3()
  const {Row, Cell} = Table
  const {id, approversCount, request} = props
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const onApprove = async () => {
    setErrorMessage('')
    try {
      const campaign = await getCampaignInstance(props.address)
      const web3 = await loadWeb3()
      const accounts = await web3.eth.getAccounts()
      await campaign.methods
        .approveRequest(id)
        .send({from: accounts[0], gas: 3000000})
      router.push(`/campaigns/${props.address}/requests`)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  const onFinalized = async () => {
    setErrorMessage('')

    try {
      const campaign = await getCampaignInstance(props.address)
      const web3 = await loadWeb3()
      const accounts = await web3.eth.getAccounts()
      await campaign.methods
        .finalizeRequest(id)
        .send({from: accounts[0], gas: 3000000})
      router.push(`/campaigns/${props.address}/requests`)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const transformValue = async () => {
    const web3 = await loadWeb3()
    const value = web3.utils.fromWei(request.value, 'ether')
    setValue(value)
  }
  const readyToFinalize = request.approvalCount > approversCount / 2

  useEffect(() => {
    transformValue()
  }, [])

  return (
    <Row
      disabled={!!request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{value}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell error={!!errorMessage}>
        {request.complete ? null : (
          <Button color="green" basic onClick={onApprove}>
            approve
          </Button>
        )}
      </Cell>
      <Cell error={!!errorMessage}>
        {request.complete ? null : (
          <Button color="teal" basic onClick={onFinalized}>
            finalize
          </Button>
        )}
      </Cell>
    </Row>
  )
}

export default RequestList
