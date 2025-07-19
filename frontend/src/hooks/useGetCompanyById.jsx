import { setSingleCompony } from '@/redux/componySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetCompanyById(companyId) {
    const dispatch = useDispatch()
  useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{
                    withCredentials: true
                })
                if(res.data.success){
                    dispatch(setSingleCompony(res.data.compony))
                }
            } catch (error) {
                console.log("fetch All Jobs error", error);
            }
        }
        fetchSingleCompany()
  },[companyId , dispatch])
}

export default useGetCompanyById