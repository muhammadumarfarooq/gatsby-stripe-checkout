import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { loadStripe } from "@stripe/stripe-js"
import { useStaticQuery, graphql } from "gatsby"

const stripePromise = loadStripe("pk_test_QFrPyvUMh0KEwfjjup8ekJvG00fl7ERXMy")

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query ProductPrices{
    prices : allStripePrice{
      edges {
        node {
        product {
          name
          images
          description
        }
          id
          active
          currency
          unit_amount
        }
      }
      }
    }
  `)
  
  console.log(data)
  const handleCheckoutUsingStripe = async () => {
    const stripe = await stripePromise
    
    const result = stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_1IHoVUDW83h03H6ENFyPT3Kq", quantity: 2 }, {
        price: "price_1IHoWNDW83h03H6E0Jh3DlLY",
        quantity: 1
      }],
      successUrl: "http://localhost:8000/success-order",
      cancelUrl: "http://localhost:8000/cancel-order"
    })
    
    console.log("Stripe checkout form...")
  }
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Payments using stripe checkout form</h1>
      <p>This code is about the stripe payments using stripe form not the custom form</p>
      
      <div className="products">
        {data.prices.edges.map(node => {
          const { id, product, unit_amount } = node.node
          return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} key={id}>
              <h1>{product.name}</h1>
              <h1>$ {unit_amount / 100}</h1>
            </div>
          )
        })}
      </div>
      
      
      <button onClick={handleCheckoutUsingStripe}>Checkout Using Stripe</button>
    
    </Layout>
  )
}

export default IndexPage
