import { useEffect, useState } from 'react'

const getPastPurchases = () => {
  try {
    return JSON.parse(localStorage.getItem('pastPurchases')) || []
  } catch (error) {
    console.error('Unable to access localStorage:', error)
    return []
  }
}

export const usePastPurchases = () => {
  const [filterList, setFilterList] = useState([])

  useEffect(() => {
    const pastPurchases = getPastPurchases()

    if (pastPurchases?.length > 0) {
      const filters = pastPurchases.map((item) => {
        return `objectID:${item.objectID}`
      })
      const combinedFilters = `${filters.join(' OR ')}`
      setFilterList(combinedFilters)
      console.log('Updated filters:', combinedFilters) // Log here to confirm the filters
    } else {
      setFilterList([]) // Explicitly handle empty filters
    }
  }, [])

  return filterList
}
