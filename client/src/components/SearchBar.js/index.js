import React from 'react'
import './style.css'
import { FaSearch} from 'react-icons/fa'
import { motion } from 'framer-motion'

const SearchBar = () => {
  return (
    <div className='searchbar_container'>
    <h1> Search Anything..</h1>
    <form id="form" role="search" className='searchForm' >
    <input type="search" id="query" name="q" className='searchInput'
   placeholder="Search..."
   aria-label="Search through site content"></input>
   <motion.button  whileHover={{ scale: 1.2}} className='searchButton'><FaSearch /></motion.button>
    </form>
    
    </div>
  )
}

export default SearchBar