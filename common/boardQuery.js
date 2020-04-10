const qpFilter = "f_"
const qBoard = "b"
const qColor = "c"
const inactiveValue = "0"
const activeValue = "1"

export const generateBoardQuery = (board) => {
  let q = `${qBoard}=${board.title}`

  if(board.color) {
    q += `&${qColor}=${board.color.substring(1)}`
  }

  if(board.filter.tags) for(let filterTagName of Object.keys(board.filter.tags)) {
    let tagValue = board.filter.tags[filterTagName].value ? activeValue : inactiveValue

    q += `&${qpFilter}${filterTagName}=${tagValue}`
  }

  return q
}

export const readBoardQuery = (queryParams) => {
  let tags = {}

  for(let queryKey of Object.keys(queryParams)) {
    if(queryKey.startsWith(qpFilter)) {
      let filterName = queryKey.substr(qpFilter.length)
      tags[filterName] = queryParams[queryKey] === activeValue
    }
  }

  return {
    title: queryParams[qBoard],
    color: queryParams[qColor] ? `#${queryParams[qColor]}` : null,
    tags,
  }
}
