import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)


const Statistiikka = ({counter, keskiarvo, positiiviset, nollaa}) => {
  const palautteita =counter.good + counter.ok + counter.bad


  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{counter.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{counter.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{counter.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiiviset}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={nollaa}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type : nappi})
  }

  laskeKeskiarvo = (counter) => {
    console.log("gere",counter)
    const laskettuKeskiArvo = ((counter.good * 1 + counter.ok * -1) 
    / (counter.good + counter.ok +  counter.bad)).toPrecision(1)
    return laskettuKeskiArvo
    
  }

  laskePositiiviset = (counter) => {
    const laskettuArvo = (((counter.good * 1)
    / (counter.good + counter.ok +  counter.bad)) *100).toPrecision(3)
    return laskettuArvo
  }

  nollaaTilastot = () => {
    store.dispatch({type : 'ZERO'})
  }

  render() {

    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka counter={store.getState()} keskiarvo={this.laskeKeskiarvo(store.getState())}
          positiiviset={this.laskePositiiviset(store.getState())}
          nollaa={this.nollaaTilastot}
          />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
