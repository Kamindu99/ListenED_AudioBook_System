import React from 'react'

function Card({ title, author, image }) {
  return (
    <div className=''>
      <div className="card">
        <img src={'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg'} alt={''} className="card-image" />
        <div className="card-content">
          <h1 className="card-title">
            <b>{title}</b>

          </h1>
          <p className="card-text">{author}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
