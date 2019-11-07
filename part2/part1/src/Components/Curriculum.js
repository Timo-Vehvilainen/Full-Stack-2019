import React from 'react'

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

const Course = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
    {course.parts.map(part => <p key={part.id}> {part.name} {part.exercises} </p>)}
    </div>
  )
}

export default Curriculum