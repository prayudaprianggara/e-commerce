import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useContext } from 'react'
import Image from 'next/image'
import Layout from '../../components/Layout'
import data from '../../utils/data'
import { Store } from '../../utils/Store'

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store)

  const { query } = useRouter()
  const { slug } = query
  const product = data.products.find((x) => x.slug === slug)
  if (!product) {
    return <div>Product Not Found</div>
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if(product.countStock < quantity ) {
      alert('Sorry. Product is out of stock')
      return
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
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
            <div className="primary-button w-full" onClick={addToCartHandler}>
              Add To Cart
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
