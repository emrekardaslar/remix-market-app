import { useLocation } from '@remix-run/react'
import React, { ChangeEvent, useEffect, useState } from 'react'

export const Filter = ({ items, products, setProducts }: any) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState([])
  const location = useLocation()

  useEffect(() => {
    setFilters([])
    setSearchTerm('')
    unCheck()
  }, [location])

  useEffect(() => {
    if (filters.length > 0) {
      const filteredProducts =
        filters.length > 0
          ? products.filter((product: any) => {
              return filters.some((brand) => product.brand == brand)
            })
          : products
      setProducts(filteredProducts)
    } else setProducts(products)
  }, [filters])

  const unCheck = () => {
    // Get all checkboxes in the document
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    // Uncheck all checkboxes
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false
    })
  }

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const filteredItems = items.filter((item: any) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleBrandClick = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const value = event.target.value
    if (isChecked) {
      setFilters([...filters, event.target.value])
    } else {
      setFilters(filters.filter((filter): any => filter !== value))
    }
  }

  return (
    <div>
      <p>Brand</p>
      <input type='text' placeholder='Search brand' value={searchTerm} onChange={handleSearch} />
      <ul>
        {filteredItems.map((item: any, index: any) => (
          <>
            <input id={index} onClick={handleBrandClick} type='checkbox' key={index} value={item} />
            <label>{item}</label>
            <br></br>
          </>
        ))}
      </ul>
    </div>
  )
}
