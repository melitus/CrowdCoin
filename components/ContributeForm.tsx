/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {useState} from 'react'
import {Button, Input, Form, Message} from 'semantic-ui-react'
import {useRouter} from 'next/router'

import {loadWeb3} from '../lib/web3'
import getCampaignInstance from '../lib/campaign'

interface IProps {
  address: string
}

const ContributeForm: React.FunctionComponent<IProps> = (props) => {
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const contributeToCampaign = async () => {
    const web3 = await loadWeb3()
    const campaign = await getCampaignInstance(props.address)
    const accounts = await web3.eth.getAccounts()
    const campaignContribute = await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether'),
    })
    return campaignContribute
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // this keep the browser fromm attempting to submit the form
    // Abort if form isn't valid
    if (!event.currentTarget.reportValidity()) return;

    setLoading(true)
    setErrorMessage('')
    try {
      await contributeToCampaign()
      router.replace(`/campaigns/${props.address}`)
    } catch (error) {
      setErrorMessage(error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <h3>Contribute to campaign!</h3>
      <Form onSubmit={handleSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={value}
            onChange={handleChange}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Contribute
        </Button>
      </Form>
    </>
  )
}

export default ContributeForm
