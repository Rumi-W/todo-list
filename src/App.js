import React, { useEffect, useState, useCallback } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(3)
  }
}))

const App = () => {
  const classes = useStyles()
  const history = useHistory()
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [viewId, setViewId] = useState(2) // 1: list, 2: details

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/todos?userId=1'
    const fetchData = async () => {
      const response = await axios({ url, method: 'GET' })
      console.log(response.data)
      setItems(response.data)

      //setSelectedItem(response.data[5])
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (Object.keys(selectedItem).length === 0) {
      setViewId(1)
    } else {
      setViewId(2)
    }
  }, [selectedItem])

  const handleSelectItem = useCallback(
    (selectedId) => {
      history.push(`/${selectedId}`)
      // console.log('items', items)
      // console.log('selectid', selectedId, typeof items[0].id)
      // const selected = items.filter((item) => {
      //   console.log('item.id', item.id)
      //   return item.id === selectedId
      // })
      // console.log('selected', selected)
      // setSelectedItem(selected[0])
    },
    [items]
  )

  return (
    // <div className={classes.root}>
    <Container>
      {viewId === 1 && (
        <Grid container direction="column" alignContent="center" spacing={2}>
          <TodoList items={items} handleSelectItem={handleSelectItem} />
        </Grid>
      )}
      {viewId === 2 && (
        <Grid container alignContent="center" spacing={2}>
          <TodoItem item={selectedItem} handleSelectItem={handleSelectItem} />
        </Grid>
      )}
      <Switch>
        <Route path="/:id">
          <TodoItem item={selectedItem} handleSelectItem={handleSelectItem} />
        </Route>
        <Route exact path="/">
          <TodoList items={items} handleSelectItem={handleSelectItem} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
