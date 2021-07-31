import React, { useEffect, useState, useCallback } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'
import axios from './config/axios-setup'
import { sortByTitle } from './utils'
import './App.css'

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

  useEffect(() => {
    console.log('app')
    const url = 'todos?userId=1'
    const fetchData = async () => {
      try {
        console.log('fetcing')
        const response = await axios({ url, method: 'GET' })
        setItems([...response.data.sort(sortByTitle)])
      } catch (e) {
        console.log('Error')
      }
    }
    fetchData()
  }, [])

  const handleSelectItem = useCallback(
    (selectedId) => {
      history.push(`/${selectedId}`)
    },
    [history]
  )

  const handleUpdateItem = useCallback(async (updatedItem) => {
    console.log(updatedItem)
    const url = `todos/${updatedItem.id}`
    const data = JSON.stringify(updatedItem)

    try {
      const response = await axios({ url, method: 'PUT', body: data })
      console.log(response.data)
    } catch (e) {
      console.log('Error')
    }
  }, [])

  console.log('app')
  return (
    <Container className="main fade-in">
      <Switch>
        <Route path="/:id">
          <TodoItem handleSelectItem={handleSelectItem} handleUpdateItem={handleUpdateItem} />
        </Route>
        <Route exact path="/">
          <TodoList items={items} handleSelectItem={handleSelectItem} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
