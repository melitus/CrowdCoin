/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {ReactNode} from 'react'
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import Header from './Header'
import Head from './Head'

interface ILayoutProps {
  children: ReactNode
  head: {
    title: string
    description: string
    canonical: string
    robots?: boolean
  }
  noLanding?: boolean
}

const Layout = (props: ILayoutProps) => {
  return (
    <>
      <Head {...props.head} />
      <Container>
        <Header />
        {props.children}
      </Container>
    </>
  )
}

export default Layout
