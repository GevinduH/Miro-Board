import React from 'react'

interface InputFieldsProps {
    max: number;
    min: number;
    componentName: string;
    placeHolder:string
  }

function InputFields({max,min,componentName,placeHolder}:InputFieldsProps) {
  return (
    <div>
        {componentName}
      {/* <input type="number" max={max}  min={min} placeholder={placeHolder} className='inputs'/> */}
      <select >
        {Array.from({ length: max - min + 1 }, (_, index) => {
          const value = min + index;
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  )
}

export default InputFields
