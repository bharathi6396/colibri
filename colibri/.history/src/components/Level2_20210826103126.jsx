import React, { useCallback, useState, useEffect } from 'react'
import '../styles/level2.css'
import Countdown from 'react-countdown';

const Completionist = () => <span>You are good to go!</span>;

function Level2() {
  const reset = () => {
    setSize (0)
    setPosition({ x: null, y: null })
    setMouseDown(false)
    setGameOver(false)
  }
  const stageRef = React.createRef()
  const [size, setSize] = useState(0)
  const [position, setPosition] = useState({ x: null, y: null })
  const [mouseDown, setMouseDown] = useState(false)
  const [gameOver, setGameOver] = useState(false)


  const getDotBigger = useCallback((e) => {
    setSize(size + 80)   // console.log("hgj")

    const board = document.getElementsByClassName('board')[0]
    const dimensions = board.getBoundingClientRect()
    const w = dimensions.width;
    const h = dimensions.height;
    if (w < size && h < size) {
      console.log(gameOver)
      setGameOver(true)
    }
    // console.log(stageRef.current.getBoundingClientRect())
    console.log(board.getBoundingClientRect())
  }, [setSize, size])


  const initDot = useCallback((event) => {
    if (position.x === null) {
      setPosition({ x: event.clientX, y: event.clientY })
      getDotBigger()
      setMouseDown(true)
    }
  }, [position, setPosition, getDotBigger, setMouseDown])

 

  return (
    <>
    
    <div className="yellow-board">
   
      <div ref={stageRef} className="board" onMouseDown={(e) => { initDot(e) }}
      >
        <div ref={stageRef}
          className="dot"
          onMouseDown={() => { getDotBigger() }}
          onMouseUp={() => setMouseDown(false)}
          style={{
            top: position.y - size / 2,
            left: position.x - size / 2,
            width: size,
            height: size,
          }}>
         
        </div>
      </div>
    </div>
    {gameOver ? <button type="button" onClick={reset}>Reload</button> : null}
    ( {gameOver ?
    <Countdown date={Date.now() + 10000} className="countdown" >
      <Completionist />
    </Countdown> : null}
  )
    </>
  )
}

export default Level2

