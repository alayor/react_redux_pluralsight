import * as types from './actionTypes'
import * as authorApi from '../../api/authorApi'

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors }
}

export function loadAuthors() {
  return async function(dispatch) {
    try {
      const authors = await authorApi.getAuthors()
      return dispatch(loadAuthorsSuccess(authors))
    } catch (error) {
      throw error
    }
  }
}
