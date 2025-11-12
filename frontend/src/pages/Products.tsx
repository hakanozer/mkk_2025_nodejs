import React, { useEffect, useState } from 'react'
import { allProducts } from '../services/productService'
import { Product } from '../models/IAllProduct'

function Products() {

  console.log("Products component rendered")
  const [arr, setArr] = useState<Product[]>([])
  useEffect(() => {
    allProducts().then(response => {
      const newArr = response.data.data.products
      setArr(newArr)
    }).catch(error => {
      console.error("Error fetching products:", error)
    })  
  }, [])
    

  return (
    <div>
        <div className='row'>
        {arr.map((item) => (
            <div className='col-sm-4' key={item._id}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <p>In Stock: {item.inStock ? 'Yes' : 'No'}</p>
                <p>Categories: {item.categories.join(', ')}</p>
                <p>Date Added: {new Date(item.dateAdded).toLocaleDateString()}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Products