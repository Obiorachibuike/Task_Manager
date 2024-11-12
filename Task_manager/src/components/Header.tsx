import React from 'react'
import "../styles/Header.css"
import Filter from './Filter'

function Header() {
  return (
    <div className='header-container'>
        <header>
            <div className="header-cont">
                <div className="header-content">
                    <div className="search-cont">
                        <div className="search-content">
                            <input type="text" name="" id="" placeholder='Search Project' />
                        </div>
                    </div>
                    <div className="filter-cont">
                        <div className="filter-content">
                            <Filter />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header