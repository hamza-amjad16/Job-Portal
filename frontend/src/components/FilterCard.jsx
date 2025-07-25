import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { clearSearchQuery, setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array:["Karachi","Lahore","Islamabad","Peshawar","Rawalpindi"]
  },
   {
    filterType: "Industry",
    array:["Frontend Developer","Backend Developer","Full Stack Developer"]
  },
]

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("")
  const dispatch = useDispatch()

 const ChangeHandler = (value) => {
    if (value === selectedValue) {
      dispatch(clearSearchQuery())
      setTimeout(() => {
        dispatch(setSearchedQuery(value));
      }, 0);
    } else {
      setSelectedValue(value)
    }
  }

  useEffect(() => {
    if (selectedValue !== "") {
      dispatch(setSearchedQuery(selectedValue));
    }
  }, [selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md '>
      <h1 className='font-bold text-lg '>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={ChangeHandler}>
        {
          filterData.map((data , index) => (
            <div key={index}>
              <h1 className='font-bold text-lg' >{data.filterType}</h1>
              {
                data.array.map((item , idx) => {
                  const itemId = `h${index} - ${idx}`
                  return (
                    <div key={itemId} className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId} >{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard