import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import SearchBar from '../../components/searchBar/SearchBar'
import Filters from '../filters/Filters'
import Pagination from '../../components/pagination/Pagination';
import Card from '../card/Card';

const AllServices = () => {


  const copyState = useSelector((state) => state.copyState)
  const [filteredCopy, setFilteredCopy] = useState(copyState)
  
  console.log(filteredCopy, 'FREDDY USA ESTE ESTADO PARA LOS FILTROS');

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const idxLast = page * perPage;
  const idxFirst = idxLast - perPage;
  const currentData = filteredCopy.slice(idxFirst, idxLast)
  const max = Math.ceil(filteredCopy.length / perPage)

  useEffect(() => {
    setPage(1);
  },[filteredCopy]);

  useEffect(() => {
    setFilteredCopy(copyState)
  }, [copyState])

  const updateFilter = (filteredData) => {
    setFilteredCopy(filteredData)
  }
  
  const updateFilterSelect = (filteredData) => {
     setFilteredCopy(filteredData);
  }
  return (

    <div className="flex flex-col mx-auto w-full items-center border bg-slate-300 py-20">
      <div className='flex gap-3'>
        <SearchBar copyState={copyState} updateFilter={updateFilter} />
        <Filters  copyState ={copyState} updateFilterSelect={updateFilterSelect}/>
      </div>
        <div className="flex flex-wrap justify-center gap-4 w-full min-h-screen max-w-screen-lg mx-auto">
        {currentData && currentData.map((serv, idx) => (
          <div key={idx} className= "rounded text-gray-900 w-[300px]">
            <Card serv={serv} />
          </div>
        ))}
        </div>
        <Pagination page={page} setPage={setPage} perPage={perPage} max={max} />
    </div>
  );
};

export default AllServices;




