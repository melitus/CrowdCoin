import React, {useState} from 'react'
import {Button, Input, Form, Message} from 'semantic-ui-react'

import Layout from '../../components/Layout'
import factory from '../../lib/factory'
import {loadWeb3} from '../../lib/web3'

const CampaignNew = () => {
    const [minimumContribution, setMinimumContribution] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = event =>{
        console.log({event: event.target.value})
        setMinimumContribution(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault() // this keep the browser fromm attempting to submit the form
        setLoading(true)
        setErrorMessage('')
        try {
        const instance = await factory()
        const web3 = await loadWeb3()
        const accounts = await web3.eth.getAccounts()
        console.log({accounts})
        console.log({submit: minimumContribution})
        // const contribution = Number(minimumContribution)
        //         console.log({contribution: contribution})
        await instance.methods
           .createCampaign(minimumContribution)
           .send({
               from: accounts[0]
           })
        } catch (error) {
            setErrorMessage(error.message)
         console.trace(error)
        }
         setLoading(false)
    }
    return (
        <Layout>
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
                  <Button loading={loading} primary>Create!</Button>
            </Form>
        </Layout>
    )
}

export default CampaignNew