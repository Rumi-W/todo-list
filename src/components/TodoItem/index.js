import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import axios from '../../config/axios-setup'

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '40px'
  },
  flexContainer2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start'
    }
  },
  switch: {
    textAlign: 'right',
    [theme.breakpoints.only('xs')]: {
      textAlign: 'left'
    }
  },
  root: {
    // Card
    width: '40vw',
    padding: theme.spacing(1, 3, 3, 3),
    [theme.breakpoints.only('sm')]: {
      width: '60vw'
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw',
      adding: theme.spacing(0)
    }
  },
  hr: {
    borderTop: '1px solid rgba(97, 97, 97, 0.2)'
  },
  action: {
    marginTop: theme.spacing(2),
    justifyContent: 'flex-end'
  }
}))

const TodoItem = ({ handleUpdateItem }) => {
  const history = useHistory()
  const { id } = useParams()
  const classes = useStyles()

  const [item, setItem] = useState({})
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const url = `todos?id=${id}`
    const fetchData = async () => {
      try {
        const response = await axios({ url, method: 'GET' })
        setItem(response.data[0])
        setCompleted(response.data[0].completed)
      } catch (e) {
        console.log('Error')
      }
    }
    fetchData()
  }, [id])

  const handleStatusChange = () => {
    const currentStatus = completed
    setCompleted(!currentStatus)
    handleUpdateItem({ ...item, completed: !currentStatus })
  }

  const goBack = () => {
    //history.push('/')
    history.goBack()
  }

  const title = `Item No. ${item.id}`
  return (
    <div className="fade-in top-padding">
      <Grid item xs={12} className={classes.flexContainer}>
        <Typography variant="h3">ToDo List Item</Typography>
      </Grid>
      <Grid item xs={12} className={classes.flexContainer}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Grid container className={classes.flexContainer2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" color="primary">{`Item No. ${item.id}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.switch}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={completed}
                      onChange={handleStatusChange}
                      name="status"
                      color="primary"
                    />
                  }
                  label="Completed"
                />
              </Grid>
            </Grid>
            <hr className={classes.hr} />
            <br />
            <Grid item xs={12} className={classes.flexContainer}>
              <Typography variant="h6">{item.title}</Typography>
            </Grid>
          </CardContent>
          <CardActions className={classes.action}>
            <Button size="large" color="secondary" onClick={goBack} tabIndex={0}>
              Close
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  )
}

export default TodoItem
