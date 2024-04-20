import React from 'react'
import "./styles.css"

const Skeleton = () => {
  return (
    <div className='skeletonContainer'>
        {new Array(5).fill(0).map((item, index) => <div key={index} className='skeletonBox' />)}
    </div>
  )
}

export default Skeleton