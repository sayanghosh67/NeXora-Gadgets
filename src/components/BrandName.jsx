import React from 'react'

export const BrandName = ({ className = "" }) => (
  <span className={`inline-block text-orange-500 font-bold ${className}`}>
    Ne<span className="text-red-600">X</span>ora
  </span>
)

export const formatBrandText = (text) => {
  if (typeof text !== 'string') return text
  const parts = text.split(/(NeXora|Nexora)/i)
  return parts.map((part, i) => 
    /nexora/i.test(part) ? <BrandName key={i} /> : part
  )
}
