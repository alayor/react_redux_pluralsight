import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadCourses as notCallThisLoadCourses } from '../../redux/actions/courseActions'
import { loadAuthors as notCallThisLoadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from './CourseForm'
import { newCourse } from '../../../tools/mockData'

function ManageCoursePage({ courses, authors, loadCourses, loadAuthors, ...props }) {
  const [course, setCourse] = useState({ ...props.course })
  const [errors, setErrors] = useState({})
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
  return <CourseForm course={course} errors={errors} authors={authors} />
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    course: newCourse,
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
