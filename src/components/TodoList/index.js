import React, { useState, useEffect, useCallback } from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import SearchInput from '../SearchInput'
import { sortByTitle, sortByTitleDesc } from '../../utils'
import axios from '../../config/axios-setup'
import './styles.css'

const TodoList = ({ handleSelectItem }) => {
  const [isSortDesc, setIsSortDesc] = useState(false)
  const [origItems, setOrigItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  const userId = 1

  useEffect(() => {
    const url = `todos`
    //const url = `todos?userId=${userId}`
    const fetchData = async () => {
      try {
        console.log('fetching')
        const response = await axios({ url, method: 'GET' })
        const data = response.data
        data.sort(sortByTitle)
        setOrigItems([...data])
        setSelectedItems([...data])
      } catch (e) {
        console.log('Error')
      }
    }
    fetchData()
  }, [])

  const debounce = (func, wait) => {
    let timeoutId = null
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
      }, wait)
    }
  }

  // eslint-disable-next-line
  const filterItems = useCallback(
    debounce((str) => {
      const selected = origItems
        .filter((item) => item.title.toLowerCase().indexOf(str) > -1)
        .sort(sortByTitle)
      setSelectedItems(selected)
    }, 250),
    [origItems]
  )

  const resetList = useCallback(() => {
    setSelectedItems([...origItems])
  }, [origItems])

  const sortAsc = (e) => {
    e.stopPropagation()
    selectedItems.sort(sortByTitle)
    setSelectedItems([...selectedItems])
  }

  const sortDesc = (e) => {
    e.stopPropagation()
    selectedItems.sort(sortByTitleDesc)
    setSelectedItems([...selectedItems])
  }

  const Row = ({ index, style }) => {
    return (
      <div
        style={style}
        role="button"
        key={selectedItems[index].id}
        className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}
        tabIndex={0}
        onClick={(e) => handleSelectItem(selectedItems[index].id)}>
        <div className="list-item_title">
          <div>
            <span>ID: {selectedItems[index].id}</span>
            <span>User ID: {selectedItems[index].userId}</span>
          </div>
          <div>{selectedItems[index].title}</div>
        </div>
      </div>
    )
  }

  console.log('list', selectedItems)
  return (
    <div className="fade-in top-padding">
      <Grid item xs={12} className="flex-container">
        <Typography variant="h3">ToDo List</Typography>
      </Grid>
      <Grid item xs={12} className="flex-container">
        <Typography variant="h6">User: {userId}</Typography>
      </Grid>
      <Grid item xs={12} className="flex-container">
        <SearchInput filterItems={filterItems} resetList={resetList} />
        <Button size="small" variant="outlined" onClick={sortAsc} color="secondary">
          <span className="material-icons">arrow_upward</span>
        </Button>
        <Button size="small" variant="outlined" onClick={sortDesc} color="secondary">
          <span className="material-icons">arrow_downward</span>
        </Button>
      </Grid>
      <Grid item xs={12} className="flex-container">
        <div className="list-wrap">
          {selectedItems.length === 0 ? (
            <Typography variant="h6" align="center">
              No Data returned
            </Typography>
          ) : (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  className="List"
                  height={height}
                  itemCount={selectedItems.length}
                  itemSize={62}
                  width={width}>
                  {Row}
                </List>
              )}
            </AutoSizer>
          )}
        </div>
      </Grid>
    </div>
  )
}

export default TodoList
