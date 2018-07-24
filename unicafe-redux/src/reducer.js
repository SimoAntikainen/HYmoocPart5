const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': {
      const newStats = {... state}
      newStats.good += 1
      return newStats
    }
    case 'OK': {
      const newStats = {...state}
      newStats.ok += 1
      return newStats
    }
    case 'BAD': {
      const newStats = {... state}
      newStats.bad += 1
      return newStats
    }
    case 'ZERO':
      return state
  }
  return state
}

export default counterReducer