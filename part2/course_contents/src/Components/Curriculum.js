import React from 'react'
import Course from './Course'

const Curriculum = ({courses, totals}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course, i) => 
        <div key={courses[i].id}>
          <Course course={course} />
          <b>total of {totals[i]} exercises</b>
        </div>)}
    </div>
  )
}

export default Curriculum