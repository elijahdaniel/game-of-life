import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import TransitionsModal from './Modal'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Controls({ randomGrid, startGrid, clearGrid, setSpeed, running, setGrid }) {
  const classes = useStyles()

  return (
    <div className="btns">
      <TransitionsModal />
      <div className={classes.root}>
        <ButtonGroup color="primary" style={{ background: "white" }} aria-label="outlined primary button group">
          <Button onClick={randomGrid}>random</Button>
          <Button onClick={startGrid}>{running ? 'stop' : 'start'}</Button>
          <Button onClick={() => setGrid(clearGrid)}>clear</Button>
        </ButtonGroup>
      </div>
      <div className={classes.root}>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button className='slow' onClick={() => setSpeed(1000)}>slow</Button>
          <Button className='medium' onClick={() => setSpeed(400)}>medium</Button>
          <Button className='fast' onClick={() => setSpeed(40)}>fast</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Controls
