import { setAllAppliedJobs } from '@/redux/jobSlice'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAppliedJobs(companyId) {
    const dispatch = useDispatch()
  useEffect(() => {
        const fetchAllAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{
                    withCredentials: true
                })
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                console.log("fetch All Jobs error", error);
            }
        }
        fetchAllAppliedJobs()
  },[dispatch])
}

export default useGetAppliedJobs