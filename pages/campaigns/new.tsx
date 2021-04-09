import React, {useState} from 'react'
import {Button, Input, Form, Message} from 'semantic-ui-react'
import {useRouter} from 'next/router'

import Layout from '../../components/Layout'
import factory from '../../lib/factory'
import {loadWeb3} from '../../lib/web3'

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinimumContribution(event.target.value)
  }

  const createCampaign = async () => {
    const instance = await factory()
    const web3 = await loadWeb3()
    const accounts = await web3.eth.getAccounts()
    const campaignCreate = await instance.methods
      .createCampaign(minimumContribution)
      .send({
        from: accounts[0],
        gas: 3000000,
      })
    return campaignCreate
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // this keep the browser fromm attempting to submit the form
    setLoading(true)
    setErrorMessage('')
    try {
      await createCampaign()
      router.push('/')
    } catch (error) {
      setErrorMessage(error.message)
    }
    setLoading(false)
  }
  return (
    <Layout
      head={{
        title: 'Create new Campaign',
        description: 'Create new Campaign crowdCoin dapp.',
        canonical: '/campaigns/new',
      }}
      noLanding={true}
    >
      <h3>Create a Campaign!</h3>
      <Form onSubmit={handleSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contributions: {minimumContribution}</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={handleChange}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  )
}

export default CampaignNew
