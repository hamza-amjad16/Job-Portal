import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

function Browse() {
    useGetAllJobs()
    const {alljobs} = useSelector((store) => store.job)
    const dispatch = useDispatch()
    useEffect(() => {
        // for clean up the query value
        return () => {
            dispatch(setSearchedQuery(""))
        }
     },[])
  return (
    <div>
        <Navbar />
        <div className='max-w-7xl mx-auto my-10'> 
            <h1 className='font-bold text-xl my-10'>Search Results ({alljobs.length}) </h1>
            <div className='grid grid-cols-3 gap-4 '>
            {
                alljobs.map((job) => {
                    return (
                        <Job key={job._id} job={job} />
                    )
                })
            }
            </div>
        </div>
    </div>
  )
}

export default Browse