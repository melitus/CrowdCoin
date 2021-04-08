/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {useState} from 'react'
import {Button, Input, Form, Message} from 'semantic-ui-react'
import Link from 'next/link'
import {useRouter} from 'next/router'

import Layout from '../../../../components/Layout'
import {loadWeb3} from '../../../../lib/web3'
import getCampaignInstance from '../../../../lib/campaign'

const NewRequestForm = (props) => {
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [recipient, setRecipient] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value)
  }
  const handleRecipientChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRecipient(event.target.value)
  }

  const createRequest = async () => {
    const campaign = await getCampaignInstance(props.address)
    const web3 = await loadWeb3()
    const accounts = await web3.eth.getAccounts()
    const newRequest = await campaign.methods
      .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
      .send({
        from: accounts[0],
        gas: 3000000,
      })
    console.log({newRequest})
    return newRequest
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // this keep the browser fromm attempting to submit the form
    setLoading(true)
    setErrorMessage('')
    try {
      await createRequest()
      router.push(`/campaigns/${props.address}/request`)
    } catch (error) {
      setErrorMessage(error.message)
    }
    setLoading(false)
  }
  return (
    <Layout>
      <Link href={`/campaigns/${props.address}/requests`}>
        <a>Back </a>
      </Link>
      <h3>Create a request</h3>
      <Form onSubmit={handleSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input value={description} onChange={handleDescriptionChange} />
        </Form.Field>
        <Form.Field>
          <label>Value in ether</label>
          <Input
            label="wei"
            labelPosition="right"
            value={value}
            onChange={handleValueChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input value={recipient} onChange={handleRecipientChange} />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  )
}

NewRequestForm.getInitialProps = async (props) => {
  const {show} = props.query as any
  return {
    address: show,
  }
}

export default NewRequestForm
