import React from 'react'
//import PropTypes from 'prop-types'
import { importanceToggling } from './../reducers/noteReducer'
import Note from './Note'
import { connect } from 'react-redux'

class NoteList extends React.Component {
  /**componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }**/

  /**toggleImportance = (id) => () => {
    this.context.store.dispatch(
      importanceToggling(id)
    )
  }**/
  render() {
    const notesToShow = () => {
      const { notes, filter } = this.props
      if (filter === 'ALL') {
        return notes
      }

      return filter === 'IMPORTANT'
        ? notes.filter(note => note.important)
        : notes.filter(note => !note.important)
    }

    return (
      <ul>
        {notesToShow().map(note =>
          <Note
            key={note.id}
            note={note}
            handleClick={() => this.props.importanceToggling(note.id)}
          />
        )}
      </ul>
    )
  }
}

/**NoteList.contextTypes = {
  store: PropTypes.object
}**/

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  importanceToggling
}

const ConnectedNoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)

export default ConnectedNoteList

//export default NoteList