import { loadComponents } from 'next/dist/next-server/server/load-components'
import React, {useEffect, useState} from 'react'
import factory from '../ethereum/factory'

const CampaignIndex = () =>{
    const [storageValue, setStorageValue] = useState(undefined)
    const [account, setAccount] = useState([])
    const [contract, setContract] = useState([])
    const [web3, setWeb3] = useState(undefined)

    useEffect(() =>{
        const init = async () => {
            try {
 // get network provider and web3 instance
        const web3 = await getWeb3()
        // Use web3 to get the uer account
        const account = await web3.eth.getAccounts();

        // Get the contract instance
        const networkId = await web3.eth.getId()
        const deploymentNetwork = SimpleStorageContract.networks[networkId]
        const instance = new web3.eth.Contract(
            SimpleStorage.abi,
            deployednetwork && deployedNetwork.address
        )

        setStorageValue(web3)
        setAccount(account)
        setContract(contract)

            } catch (error) {

            }

        }
        init()

    }, [])

    useEffect(()=>{
        const load = async() => {
         await contract.method.set(5).send({from: account[0]})
         const response = await contract.method.get().call()
         setStorageValue(response)

        }
     if(typeof web3 !== undefined
        && typeof account !== undefined
        && typeof contract !== undefined )
        {
            load()
        }
    },[web3,account,contract])

     if(typeof web3 !== undefined)
        {
            return <div></div>
        }
    return(
       <h1></h1>
    )
}