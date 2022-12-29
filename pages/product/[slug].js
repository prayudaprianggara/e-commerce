import { useRouter } from 'next/router'
import React from 'react'
import data from '../../utils/data'
import Layout from '../../components/Layout' 

export default function ProductScreen() {
  const { query } = useRouter()
  const { slug } = query
  const product = data.products.find((x) => x.slug === slug)
  if (!product) {
    return <p>Product Not Found</p>
  }

  return (
    <Layout title={product.name}>
      <h1>{product.name}</h1>
    </Layout>
  )
}
