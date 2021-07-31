import React, { useState } from 'react'
import './styles.css'

const SearchInput = ({ filterItems, resetList }) => {
  const [searchText, setSearchText] = useState('')

  const handleChange = (e) => {
    console.log('e', e.target.value)
    setSearchText(e.target.value)
    if (e.target.value === '') {
      resetList()
    } else {
      filterItems(e.target.value)
    }
  }

  return (
    <input
      className="search-field"
      type="text"
      placeholder="Search Todo Items"
      value={searchText}
      onChange={handleChange}
      tabIndex={-1}
      autoComplete="off"
    />
  )
}

export default SearchInput
