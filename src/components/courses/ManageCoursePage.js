import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadCourses, saveCourse } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from './CourseForm'
import { newCourse } from '../../../tools/mockData'

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course })
  const [errors] = useState({})
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed: ' + error)
      })
    } else {
      setCourse({ ...props.course })
    }
    if (authors.length === 0) {
      try {
        loadAuthors().catch((error) => {
          alert('Loading authors failed: ' + error)
        })
      } catch (error) {
        alert('Loading authors failed: ' + error)
      }
    }
  }, [props.course]) //an empty array means the effect will run once when the component mounts

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target /* this destructure avoids the event getting garbage collected 
    so that it's available within the nested setCourse callback*/
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }))
  }

  function handleSave(event) {
    event.preventDefault()
    saveCourse(course).then(() => {
      history.push('/courses')
    })
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  )
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug
  const course = slug && state.courses.length ? getCourseBySlug(state.courses, slug) : newCourse
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  }
}

const mapDispatchToProps = {
  loadCourses: loadCourses,
  saveCourse: saveCourse,
  loadAuthors: loadAuthors,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCoursePage)
