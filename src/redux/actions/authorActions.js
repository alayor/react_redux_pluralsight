import * as types from './actionTypes'
import * as authorApi from '../../api/authorApi'
import { beginApiCall } from './apiStatusActions'

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors }
}

export function loadAuthors() {
  return async function(dispatch) {
    try {
      dispatch(beginApiCall())
      const authors = await authorApi.getAuthors()
      return dispatch(loadAuthorsSuccess(authors))
    } catch (error) {
      throw error
    }
  }
}
