const paginateData = (array, itemsPerPage, currentPage) => {
  const index = currentPage - 1
  const minPage = index * itemsPerPage
  const maxPage = minPage + itemsPerPage
  return array.slice(minPage, maxPage)
}

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

module.exports = { paginateData, scrollTop }
