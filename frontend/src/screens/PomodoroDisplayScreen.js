import React, { useState, useEffect } from 'react'

const PomodoroDisplayScreen = () => {
  const [pomodoroDuration, setPomodoroDuration] = useState(25)
  const [seconds, setSeconds] = useState(25 * 60)
  const [restDuration, setRestDuration] = useState(5)
  const [isActive, setIsActive] = useState(false)

  const toggle = () => {
    setIsActive(!isActive)
  }

  const reset = () => {
    setSeconds(pomodoroDuration * 60)
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
  }, [isActive, seconds, pomodoroDuration])

  const style = {
    display: 'grid',
    placeItems: 'center',
  }
  return (
    <>
      <div style={style}>
        <h1>Display timer</h1>
        <p>Number of Pomodoros: 1</p>
        <p>
          {!(seconds > 0) ? (
            <h2>00 : 00</h2>
          ) : (
            `${Math.trunc(seconds / 60)} : ${seconds % 60}`
          )}
        </p>
        <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
        <p>
          Rest: {restDuration},{' '}
          <button
            onClick={() => {
              setRestDuration(restDuration - 1)
            }}
          >
            Decrease rest period
          </button>
          <button
            onClick={() => {
              setRestDuration(restDuration + 1)
            }}
          >
            Increase rest period
          </button>
        </p>
        <p>
          Duration of a pomodoro: {pomodoroDuration}{' '}
          <button
            onClick={() => {
              setPomodoroDuration(pomodoroDuration - 1)
              // setSeconds(pomodoroDuration * 60)
            }}
          >
            Decrease pomodoro
          </button>
          <button
            onClick={() => {
              setPomodoroDuration(pomodoroDuration + 1)
              // setSeconds(pomodoroDuration * 60)
            }}
          >
            Increase pomodoro
          </button>
        </p>
        <button onClick={reset}>Reset timer</button>
      </div>
    </>
  )
}

export default PomodoroDisplayScreen
