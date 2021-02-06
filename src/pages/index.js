import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const handleCheckoutUsingStripe = () => {
    console.log("Stripe checkout form...")
  }
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Payments using stripe checkout form</h1>
      <p>This code is about the stripe payments using stripe form not the custom form</p>
      
      <button onClick={handleCheckoutUsingStripe}>Checkout Using Stripe</button>
    
    </Layout>
  )
}

export default IndexPage
