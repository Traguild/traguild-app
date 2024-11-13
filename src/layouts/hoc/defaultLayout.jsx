import React from 'react'
import Layout from "../default-layout";

const defaultLayout = (Component) => {
  return (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  )
}

export default defaultLayout
