import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#000',
    width: '100%'
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    marginLeft: '2px',
    fontWeight: 'bold'
  }
}))

export default () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <div className={classes.user}>
            <span className="material-icons" style={{ fontSize: '28px' }}>
              account_circle
            </span>
            <Typography className={classes.userName}>User 1</Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
