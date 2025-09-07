import React from 'react'

export const Skeleton = ({ className = '' }) => (
  <div className={`skeleton ${className}`} style={{background:'#eee',borderRadius:4}} />
)

export default Skeleton
