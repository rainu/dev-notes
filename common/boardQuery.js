const queryPrefix = "f_"
const inactiveValue = "0"
const activeValue = "1"

export const generateBoardQuery = (board) => {
  let q = ""

  if(board.filter.tags) for(let filterTagName of Object.keys(board.filter.tags)) {
    let tagValue = board.filter.tags[filterTagName].value ? activeValue : inactiveValue

    q += `&${queryPrefix}${filterTagName}=${tagValue}`
  }

  if(q.length !== 0) {
    q = q.substr(1) //remove first &
  }

  return q
}

export const readBoardQuery = (queryParams) => {
  let tags = {}

  for(let queryKey of Object.keys(queryParams)) {
    if(queryKey.startsWith(queryPrefix)) {
      let filterName = queryKey.substr(queryPrefix.length)
      tags[filterName] = queryParams[queryKey] === activeValue
    }
  }

  return {
    tags
  }
}
