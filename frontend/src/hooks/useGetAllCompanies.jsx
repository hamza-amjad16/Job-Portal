import { setCompanies } from '@/redux/componySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllCompanies() {
    const dispatch = useDispatch()
  useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{
                    withCredentials: true
                })
                if(res.data.success){
                    dispatch(setCompanies(res.data.componies))
                }
            } catch (error) {
                console.log("fetch All Jobs error", error);
            }
        }
        fetchAllCompanies()
  },[])
}

export default useGetAllCompanies