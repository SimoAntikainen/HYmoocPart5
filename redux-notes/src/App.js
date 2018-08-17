import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
)

const Note = ({note}) => {
  return(
  <div>
    <h2>{note.content}</h2>
    <div>{note.user}</div>
    <div><strong>{note.important? 'tärkeä' : ''}</strong></div>
  </div>
)}

const Notes = ({notes}) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map(note=>
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      )}
    </ul>  
  </div>
)

const Users = ({notes}) => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>  
  </div>
)

const Login = ({onLogin, history}) => {
  const onSubmit = (event) => {
    event.preventDefault()
    onLogin('mluukkai')
    history.push('/')
  }
  return (
  <div>
    <h2>login</h2>
    <form onSubmit={onSubmit}>
      <div>
        username: <input />
      </div>
      <div>
        password: <input type='password'/>
      </div>      
      <button type="submit">login</button>
    </form>
  </div>
)}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [
        {
          id: 1,
          content: 'HTML on helppoa',
          important: true,
          user: 'Matti Luukkainen'
        },
        {
          id: 2,
          content: 'Selain pystyy suorittamaan vain javascriptiä',
          important: false,
          user: 'Matti Luukkainen'
        },
        {
          id: 3,
          content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
          important: true,
          user: 'Arto Hellas'
        }
      ],
      user: null
    }
  }

  login = (user) => {
    this.setState({user})
  }

  render() {
    const noteById = (id) =>
      this.state.notes.find(note => note.id === Number(id)) 

    return (
      <div>        
        <Router>
          <div>
            <div>
              <Link to="/">home</Link> &nbsp;
              <Link to="/notes">notes</Link> &nbsp;
              <Link to="/users">users</Link> &nbsp;
              {this.state.user
                ? <em>{this.state.user} logged in</em> 
                : <Link to="/login">login</Link>
              }
            </div>

            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/notes" render={() => <Notes notes={this.state.notes}/>} />
            <Route exact path="/notes/:id" render={({match}) => 
              <Note note={noteById(match.params.id)} />}
            />            
            <Route path="/users" render={() => 
              this.state.user 
                ? <Users />
                : <Redirect to="/login" />
              }/>
            <Route path="/login" render={({history}) => 
              <Login history={history} onLogin={this.login}/>} 
            />
          </div>
        </Router>
        <div>
          <br />
          <em>Note app, Department of Computer Science 2018</em>
        </div>  
      </div>
    );
  }
}

export default App

/** Redux part 6.6
 import React from 'react'
import NoteForm from './components/NoteForm.js'
import NoteList from './components/NoteList.js'
import VisibilityFilter from './components/VisibilityFilter'
import { connect } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

class App extends React.Component {
  componentWillMount() {
    this.props.initializeNotes()
  }

  render() {
    return (
      <div>
        <NoteForm />
        <VisibilityFilter />
        <NoteList />
      </div>
    )
  }
}

export default connect(
  null,
  { initializeNotes }
)(App)
 */