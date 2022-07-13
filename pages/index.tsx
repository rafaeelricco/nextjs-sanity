import styles from '../styles/Home.module.css'
import { client, urlFor } from '../lib/client'
import BlockContent from '@sanity/block-content-to-react'
import { Product } from '../typings'
import Link from 'next/link'

interface Props {
  products: [Product]
}

export default function Home({ products, BannerData }: Props) {
  console.log(products)
  return (
    <div className={styles.container}>
      {products?.map((product) => (
        <div key={product._id} product={product}>
          <Link key={product._id} href={`/product/${product.slug.current}`}>
            <img
              src={urlFor(product.mainImage[0]).width(500).url()}
              alt={product.name}
            />
          </Link>

          <h1>{product.name}</h1>
          <BlockContent blocks={product.description} />
          <div>
            <h2>R$ {product.price}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  return {
    props: { products }
  }
}
