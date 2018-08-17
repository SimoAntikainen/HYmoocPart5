import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button, Alert,
        Navbar, NavbarBrand,NavItem, Nav, MenuItem, NavDropdown } from 'react-bootstrap'

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
    <Table striped>
      <tbody>
        {notes.map(note=>
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )}
      </tbody>
    </Table>  
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
  const onSubmit = (e) => {
    e.preventDefault()
    onLogin(e.target.username.value)
    history.push('/')
  }
  return (
  <div>
    <h2>login</h2>
    <form onSubmit={onSubmit}>
      <FormGroup>
        <ControlLabel>username:</ControlLabel>
        <FormControl 
          type='text'
          name='username'
        />  
        <ControlLabel>password:</ControlLabel>
        <FormControl
          type='password'
        />             
        <Button bsStyle="success" type='submit'>login</Button>
      </FormGroup>
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
    this.setState({ user, message: `welcome ${user}` })
    setTimeout(() => {
      this.setState({ message: null })
    }, 10000);
  }

  render() {
    const noteById = (id) =>
      this.state.notes.find(note => note.id === Number(id)) 

    const style = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }

    return (
      <div className='container'>        
        <Router>
          <div>
            {(this.state.message &&
              <Alert color="success">
                {this.state.message}
              </Alert>
            )}

            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  Anecdote app                
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem href="#">
                    <Link to="/">home</Link>
                  </NavItem>
                  <NavItem href="#">
                    <Link to="/notes">notes</Link>
                  </NavItem>
                  <NavItem href="#">
                    <Link to="/users">users</Link>
                  </NavItem>
                  <NavItem>
                    {this.state.user
                      ? <em>{this.state.user} logged in</em>
                      : <Link to="/login">login</Link>
                    }
                  </NavItem>                        
                </Nav>  
              </Navbar.Collapse>
            </Navbar>

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
        <div style={style}>
          <br />
          <em>Note app, Department of Computer Science 2018</em>
        </div>  
      </div>
    )
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