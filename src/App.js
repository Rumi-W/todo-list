import React, { useCallback } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import NavBar from './components/NavBar'
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'
import axios from './config/axios-setup'
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
    <Container maxWidth="xl" className="fade-in" style={{ padding: 0 }}>
      <NavBar />
      <Switch>
        <Route path="/:id">
          <TodoItem handleSelectItem={handleSelectItem} handleUpdateItem={handleUpdateItem} />
        </Route>
        <Route exact path="/">
          <TodoList handleSelectItem={handleSelectItem} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
