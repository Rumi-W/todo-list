import React, { useCallback, useState, useEffect } from 'react'
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
  const [origItems, setOrigItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  const currentUserId = 5 // Assume a User is loggin in

  useEffect(() => {
    const url = `todos`
    const fetchData = async () => {
      try {
        const response = await axios({ url, method: 'GET' })
        setOrigItems([...response.data])
        setSelectedItems([...response.data])
      } catch (e) {
        console.log('Error')
      }
    }
    fetchData()
  }, [])

  const handleSelectItem = useCallback(
    (selectedId) => {
      history.push(`/item?id=${selectedId}`)
    },
    [history]
  )

  const handleSelectUser = useCallback(async () => {
    const url = `todos?userId=${currentUserId}`
    try {
      const response = await axios({ url, method: 'GET' })
      setOrigItems([...response.data])
    } catch (e) {
      console.log('Error')
    }
  }, [])

  const getAllItems = useCallback(async () => {
    const url = `todos`
    try {
      const response = await axios({ url, method: 'GET' })
      setOrigItems([...response.data])
    } catch (e) {
      console.log('Error')
    }
  }, [])

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
        <Route path="/item">
          <TodoItem handleUpdateItem={handleUpdateItem} />
        </Route>
        <Route exact path="/">
          <TodoList
            origItems={origItems}
            handleSelectItem={handleSelectItem}
            getCurrentUserData={handleSelectUser}
            getAllItems={getAllItems}
          />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
