import React, { useState, useEffect } from 'react'

const PomodoroDisplayScreen = () => {
  const [seconds, setSeconds] = useState(`${25 * 60}`)
  const [isActive, setIsActive] = useState(false)

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setSeconds(`${25 * 60}`)
    setIsActive(false)
  }

  useEffect(() => {
    let timer = null
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((seconds) => seconds - 1)
      }, 1000)
    } else if (!isActive && seconds === 0) {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [isActive, seconds])

  return (
    <>
      <h1>Display timer</h1>
      <p>Number of Pomodoros: 1</p>
      <p>
        {Math.trunc(seconds / 60)} : {seconds % 60}
      </p>

      <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset timer</button>
    </>
  )
}

export default PomodoroDisplayScreen
