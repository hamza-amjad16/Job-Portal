import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

function Browse() {
    const { filteredJobs } = useSelector((store) => store.job)
    useGetAllJobs()
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-xl my-10'>
                    Search Results ({filteredJobs.length})
                </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Browse
