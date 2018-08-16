import React from 'react'
//import PropTypes from 'prop-types'
import { importanceToggling } from './../reducers/noteReducer'
import Note from './Note'
import { connect } from 'react-redux'

const NoteList = (props) => (
  <ul>
    {props.visibleNotes.map(note =>
      <Note
        key={note.id}
        note={note}
        handleClick={() => props.importanceToggling(note.id)}
      />
    )}
  </ul>
)

/**NoteList.contextTypes = {
  store: PropTypes.object
}**/

/**const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    filter: state.filter
  }
}**/
const notesToShow = (notes, filter) => {
  if (filter === 'ALL') {
    return notes
  }
  return filter === 'IMPORTANT'
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important)
}

const mapStateToProps = (state) => {
  return {
    visibleNotes: notesToShow(state.notes, state.filter)
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