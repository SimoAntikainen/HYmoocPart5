import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import App from './App';
import reducer from './reducer'

const store = createStore(reducer)

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)


/**import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votesAnecdotes: {...[...new Array(this.props.anecdotes.length)].map(x => 0)}, 
      mostVoted: 0
    }
  }

  nextAnecdote = () => {  
    const randomNumber = this.randomInt(this.props.anecdotes.length)
    this.setState({selected: randomNumber})
  }

  randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  voteAnecdote = () => {
    const copiedAnecdotes = {...this.state.votesAnecdotes}
    copiedAnecdotes[this.state.selected] += 1
    this.setState({votesAnecdotes: copiedAnecdotes}, function() {this.mostVotes()})
  }

  mostVotes = () => {
    const cpyAnec = {...this.state.votesAnecdotes}
    const largestKey = Object.keys(cpyAnec).reduce((x, y) => cpyAnec[x] > cpyAnec[y] ? x : y)
    this.setState({mostVoted: largestKey})
  }

  render() {
    return (
      <div>
        <div>
          <p>{this.props.anecdotes[this.state.selected]}</p>
        </div>
        <div>
          <p>Has {this.state.votesAnecdotes[this.state.selected]} votes</p>
        </div>
        <div>
          <button onClick={this.nextAnecdote}>Next anecdote</button>
          <button onClick={this.voteAnecdote}>Vote</button>
        </div>
        <div>
          <h1>anecdote with most votes</h1>
        </div>
        <div>
          <p>{this.props.anecdotes[this.state.mostVoted]}</p>
        </div>
        <div>
          <p>Has {this.state.votesAnecdotes[this.state.mostVoted]} votes</p>
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)**/
