import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const PaginationContext = React.createContext()

const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState()
  const [pageLinksAmount, setPageLinksAmount] = useState()
  const [pageLinksRange, setPageLinksRange] = useState([])

  useEffect(() => {
    setPageLinksRange([...Array(pageLinksAmount).keys()].map((x) => ++x))
  }, [pageLinksAmount])

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        pageLinksAmount,
        setPageLinksAmount,
        pageLinksRange,
        setPageLinksRange
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export default PaginationContext

export { PaginationProvider }

PaginationProvider.propTypes = {
  children: PropTypes.element.isRequired
}
