import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadCourses as notCallThisLoadCourses } from '../../redux/actions/courseActions'
import { loadAuthors as notCallThisLoadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'

function ManageCoursePage({ courses, authors, loadCourses, loadAuthors }) {
  useEffect(async () => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed: ' + error)
      })
    }
    if (authors.length === 0) {
      try {
        await loadAuthors()
      } catch (error) {
        alert('Loading authors failed: ' + error)
      }
    }
  }, []) //the empty array means the effect will run once when the component mounts
  return (
    <>
      <h2>Manage Course</h2>
    </>
  )
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  }
}

const mapDispatchToProps = {
  loadCourses: notCallThisLoadCourses,
  loadAuthors: notCallThisLoadAuthors,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCoursePage)
