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
  const currentUserId = 5 // Assume a User is loggin in

  const handleSelectItem = useCallback(
    (selectedId) => {
      history.push(`/${selectedId}`)
    },
    [history]
  )

  const handleSelectUser = useCallback(() => {
    history.push(`/user/${currentUserId}`)
  }, [history])

  const goHome = useCallback(() => {
    history.push(`/`)
  }, [history])

  const handleUpdateItem = useCallback(async (updatedItem) => {
    const url = `todos/${updatedItem.id}`
    const data = JSON.stringify(updatedItem)

    try {
      const response = await axios({ url, method: 'PUT', body: data })
    } catch (e) {
      console.log('Error')
    }
  }, [])

  return (
    <Container maxWidth="xl" className="fade-in" style={{ padding: 0 }}>
      <NavBar currentUserId={currentUserId} />
      <Switch>
        <Route path="/user/:userId">
          <TodoList
            handleSelectItem={handleSelectItem}
            goToCurrentUserData={handleSelectUser}
            goBackHome={goHome}
          />
        </Route>
        <Route path="/:id">
          <TodoItem handleUpdateItem={handleUpdateItem} />
        </Route>
        <Route exact path="/">
          <TodoList
            handleSelectItem={handleSelectItem}
            goToCurrentUserData={handleSelectUser}
            goBackHome={goHome}
          />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
