/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {ReactNode} from 'react'
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Head from 'next/head'

import Header from './Header'

type ILayoutProps = {
  children: ReactNode
}

const Layout = ({children}: ILayoutProps) => {
  return (
    <>
      <Head>
        <title>CrowdCoin Dapp</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="solidity:title"
          content="CrowdCoin Dapp with Solidity and Web3"
        />
      </Head>
      <Container>
        <Header />
        {children}
      </Container>
    </>
  )
}

export default Layout
