import React from 'react'

function Colors({ setColor }) {
  return (
    <div className='colors'>
      <span>Change Color:</span>
      <div className='green' onClick={() => setColor('green')} />
      <div className='blue' onClick={() => setColor('blue')} />
      <div className='orange' onClick={() => setColor('orange')} />
      <div className='pink' onClick={() => setColor('pink')} />
      <div className='yellow' onClick={() => setColor('yellow')} />
      <div className='red' onClick={() => setColor('red')} />
    </div>
  )
}

export default Colors
