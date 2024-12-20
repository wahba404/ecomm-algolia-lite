import { Configure, Hits, Highlight, Index, useConfigure } from 'react-instantsearch'
import Hit from './Hit'

import { usePastPurchases } from '../hooks/usePastPurchases'

const PastPurchase = () => {
  const filterList = usePastPurchases()

  console.log(filterList)

  return (
    <div className="container mx-auto p-8 ">
      <h2 className="text-xl font-semibold mb-2">Past Purchases</h2>
      <div className="border-b border-gray-300 mb-4"></div>
      <div className="relative w-full">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          onClick={() => {
            document.getElementById('carousel').scrollBy({ left: -300, behavior: 'smooth' })
          }}
        >
          &lt;
        </button>
        <div id="carousel" className="w-1/8 overflow-x-auto flex justify-start items-start">
          <Index indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}>
            {filterList.length >= 1 && <ScopedConfigure key={filterList} filters={filterList} />}
            <Hits
              hitComponent={({ hit }) => <Hit hit={hit} highlight={Highlight} />}
              classNames={{
                root: 'flex justify-start items-start p-4 m-4 ',
                list: 'flex space-x-2 ',
                item: 'p-1 border-2 border-gray-200 rounded shadow-md flex-shrink-0 scroll-snap-align-start h-1/4 w-1/4',
              }}
            />
          </Index>
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          onClick={() => {
            document.getElementById('carousel').scrollBy({ left: 300, behavior: 'smooth' })
          }}
        >
          &gt;
        </button>
      </div>
      <div className="border-b border-gray-300 mb-4"></div>
    </div>
  )
}

const ScopedConfigure = ({ filters }) => {
  // console.log("filters", filters); // "objectID:1F000121Khaki OR objectID:5CB6100 OR objectID:1F000121Khaki OR objectID:1G011055WhiteCap"
  useConfigure({
    hitsPerPage: 4,
    filters: filters || '',
  })

  return null // This component only handles configuration
}

export default PastPurchase
