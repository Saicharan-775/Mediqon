import React from 'react'
import BodyFilters from "./BodyFilters";
import ThreeScene from "./ThreeScene";
const BodyViewer = () => {
  return (
       <div className="bg-white rounded-3xl p-6 shadow-sm">
      <BodyFilters />

      <div className="h-[520px] rounded-2xl overflow-hidden">
        <ThreeScene />
      </div>
    </div>
  )
}

export default BodyViewer