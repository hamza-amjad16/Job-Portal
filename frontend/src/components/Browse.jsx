import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

function Browse() {
    const { filteredJobs } = useSelector((store) => store.job) // ✅ 1. Use filteredJobs
    useGetAllJobs()
    const dispatch = useDispatch()

    useEffect(() => {
        // ✅ Clear query jab Browse se bahar niklay
        return () => {
            dispatch(setSearchedQuery(""))
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'> 
                <h1 className='font-bold text-xl my-10'>
                    Search Results ({filteredJobs.length}) {/* ✅ 2. Count from filtered */}
                </h1>
                <div className='grid grid-cols-3 gap-4 '>
                    {
                        filteredJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse
