import React, { useState, useEffect } from 'react'

const PomodoroDisplayScreen = () => {
  const [pomodoroDuration, setPomodoroDuration] = useState(25)
  const [pomodoroDone, setPomodoroDone] = useState(0)
  const [restDuration, setRestDuration] = useState(5)
  const [seconds, setSeconds] = useState(25 * 60)
  const [restSeconds, setRestSeconds] = useState(5 * 60)
  const [isActive, setIsActive] = useState(false)

  const toggle = () => {
    setIsActive(!isActive)
  }

  const reset = () => {
    setSeconds(pomodoroDuration * 60)
    setRestSeconds(restDuration * 60)
  }

  const pomodoroDurationPlus = () => {
    if (pomodoroDuration < 60) {
      setPomodoroDuration((pomodoroDuration) => pomodoroDuration + 1)
    }
  }

  const pomodoroDurationMinus = () => {
    if (pomodoroDuration > 0) {
      setPomodoroDuration((pomodoroDuration) => pomodoroDuration - 1)
    }
  }

  const restDurationPlus = () => {
    if (restDuration < 60) {
      setRestDuration((restDuration) => restDuration + 1)
    }
  }

  const restDurationMinus = () => {
    if (restDuration > 0) {
      setRestDuration((restDuration) => restDuration - 1)
    }
  }
  useEffect(() => {
    if (isActive && restSeconds === 0 && seconds === 0) {
      setSeconds(pomodoroDuration * 60)
      setRestSeconds(restDuration * 60)
      setPomodoroDone((pomodoroDone) => pomodoroDone + 1)
    }

    const timer = setInterval(() => {
      if (isActive && seconds > 0) {
        setSeconds((seconds) => seconds - 1)
      } else if (isActive && restSeconds > 0 && seconds === 0) {
        setRestSeconds((restSeconds) => restSeconds - 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, seconds, restSeconds, pomodoroDuration, restDuration])

  const style = {
    display: 'grid',
    placeItems: 'center',
  }
  return (
    <>
      <div style={style}>
        {isActive && seconds > 0 ? <h1>Work</h1> : <h1>Rest</h1>}
        <p>Number of Pomodoros done: {pomodoroDone}</p>

        {seconds === 0 ? (
          <h2>
            {Math.trunc(restSeconds / 60)} : {restSeconds % 60}
          </h2>
        ) : (
          <h2>
            {Math.trunc(seconds / 60)} : {seconds % 60}
          </h2>
        )}

        <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={() => setSeconds(seconds - 1)}>---testing work</button>
        <button onClick={() => setRestSeconds(restSeconds - 1)}>
          --- testing rest
        </button>

        {isActive && seconds === 0 && (
          <button onClick={() => setRestSeconds(0)}>Skip rest</button>
        )}

        <p>
          Rest: {restDuration},{' '}
          <button onClick={restDurationMinus}>Decrease rest period</button>
          <button onClick={restDurationPlus}>Increase rest period</button>
        </p>
        <p>
          Duration of a pomodoro: {pomodoroDuration}{' '}
          <button onClick={pomodoroDurationMinus}>Decrease pomodoro</button>
          <button onClick={pomodoroDurationPlus}>Increase pomodoro</button>
        </p>
        <button onClick={reset}>Reset timer</button>
      </div>
    </>
  )
}

export default PomodoroDisplayScreen
