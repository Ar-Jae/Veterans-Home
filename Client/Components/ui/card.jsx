export const CardTitle = ({ children, className = '' }) => (
  <div className={`card-title text-xl font-bold mb-2 ${className}`}>{children}</div>
)
import React from 'react'

export const Card = ({ children, className = '' }) => (
  <div className={`card ${className}`}>{children}</div>
)

export const CardContent = ({ children, className = '' }) => (
  <div className={`card-content ${className}`}>{children}</div>
)

export const CardHeader = ({ children, className = '' }) => (
  <div className={`card-header font-semibold text-lg mb-2 ${className}`}>{children}</div>
)

export const CardFooter = ({ children, className = '' }) => (
  <div className={`card-footer mt-2 text-right ${className}`}>{children}</div>
)

export default Card
