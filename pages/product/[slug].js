import { useRouter } from 'next/router'
import React from 'react'
import data from '../../utils/data'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'

export default function ProductScreen() {
  const { query } = useRouter()
  const { slug } = query
  const product = data.products.find((x) => x.slug === slug)
  if (!product) {
    return <p>Product Not Found</p>
  }

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to product</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg font-semibold">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} Reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>$ {product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product.countStock > 0 ? 'Ready Stock' : 'Out of Stock'}
              </div>
            </div>
              <div className="primary-button w-full">Add To Cart</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
