import React, { useEffect, useState, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import SearchInput from '../SearchInput'
import { sortByTitle } from '../../utils'

import './style.css'

const TodoList = ({ items, handleSelectItem }) => {
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    setSelectedItems(items.sort(sortByTitle))
  }, [items])

  const debounce = (func, wait) => {
    let timeoutId = null
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
      }, wait)
    }
  }
  // add sort funcions

  // eslint-disable-next-line
  const filterItems = useCallback(
    debounce((str) => {
      console.log('str', str)
      const selected = items.filter((item) => item.title.toLowerCase().indexOf(str) > -1).sort()
      setSelectedItems(selected)
    }, 250),
    [items]
  )

  const resetList = useCallback(() => {
    setSelectedItems([...items])
  }, [items])

  return (
    <React.Fragment>
      <Grid item xs={12} className="flex-container">
        <h1>ToDo List</h1>
      </Grid>
      <Grid item xs={12} className="flex-container">
        <SearchInput filterItems={filterItems} resetList={resetList} />
        <Button size="small" variant="outlined" color="secondary">
          <span className="material-icons">arrow_upward</span>
        </Button>
        <Button size="small" variant="outlined" color="secondary">
          <span className="material-icons">arrow_downward</span>
        </Button>
      </Grid>
      <Grid item xs={12} className="flex-container">
        <div className="list">
          <ul>
            {selectedItems.map((item) => (
              <li key={item.id} tabIndex={0} onClick={(e) => handleSelectItem(item.id)}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </Grid>
    </React.Fragment>
  )
}

export default TodoList
