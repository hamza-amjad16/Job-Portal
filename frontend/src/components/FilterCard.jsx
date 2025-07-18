import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
  {
    filterType: "Location",
    array:["Karachi","Lahore","Islamabad","Peshawar","Rawalpindi"]
  },
   {
    filterType: "Industry",
    array:["Frontend Developer","Backend Developer","Full Stack Developer"]
  },
   {
    filterType: "Salary",
    array:["0-80k","80 to 2lakh","2lakh to 5lakh"]
  },
]

function FilterCard() {
  return (
    <div className='w-full bg-white p-3 rounded-md '>
      <h1 className='font-bold text-lg '>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup>
        {
          filterData.map((data , index) => (
            <div key={index}>
              <h1 className='font-bold text-lg' >{data.filterType}</h1>
              {
                data.array.map((item , index) => {
                  return (
                    <div key={index} className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item}  />
                      <Label  >{item}</Label>
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