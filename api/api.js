import users from './users.json'
import { filter, includes, drop } from 'lodash'

function createResponseObject (Page, PageCount, ItemsPerPage, Result) {
  return { Page, PageCount, ItemsPerPage, Result }
}

function getPaginatedItems (items, page, pageSize) {
  const offset = (page - 1) * pageSize
  const paginatedItems = drop(items, offset).slice(0, pageSize)
  const pageCount = Math.ceil(items.length / pageSize)
  return { paginatedItems, pageCount }
}

export default {
  get (params) {
    return new Promise(resolve => {
      if (params) {
        const { name, page = 1, pageSize = 10 } = params
        let result = users

        if (name) {
          result = filter(result, ({ text }) => includes(text, name))
        }
        const { paginatedItems, pageCount } = getPaginatedItems(result, page, pageSize)
        resolve(createResponseObject(page, pageCount, pageSize, paginatedItems ))
      } else {
        resolve(createResponseObject(1, 1, users.length, users))
      }
    })
  }
}
