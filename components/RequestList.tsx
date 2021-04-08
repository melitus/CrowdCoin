/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {useState, useEffect} from 'react'
import {Table} from 'semantic-ui-react'
import {loadWeb3} from '../lib/web3'

// import {loadWeb3} from '../lib/web3'

interface IProps {
  key: string
  id: string
  request: request
  address: string
}

type request = {
  description: string
  value: string
  approvalCount: string
  recipient: string
}

const RequestList: React.FunctionComponent<IProps> = (props) => {
  //   const web3 = await loadWeb3()
  const {Row, Cell} = Table
  const {id, request} = props
  const [value, setValue] = useState('')

  const transformValue = async () => {
    const web3 = await loadWeb3()
    const value = web3.utils.fromWei(request.value, 'ether')
    setValue(value)
  }
  useEffect(() => {
    transformValue()
  }, [])

  return (
    <Row>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{value}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>{request.approvalCount}</Cell>
    </Row>
  )
}

export default RequestList
