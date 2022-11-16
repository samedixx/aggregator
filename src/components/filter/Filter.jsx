import { useState } from 'react'
import './filter.scss'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

const Filter = ({providersx, filterValueSelected, searchValueSelected, categoryPageValue}) => {
    
    const handleChange = (event) => {
        //console.log(event.target.value)
        filterValueSelected(event.target.value)
    }

    const [srcValue, setSrcValue] = useState('')

    const handleSearch = (event) => {
        setSrcValue(event.target.value)
        if(event.target.value === '') {
            searchValueSelected('')
        }
        if(event.target.value.length > 3) {
            searchValueSelected(event.target.value)
        }
    }

    const handleClick = () => {
        searchValueSelected(srcValue)
    }


    return (
        <div className='filter'>
            <div className="container_filter">
                <select name="category" id="category" onChange={(e) => categoryPageValue(e.target.value)}>
                    <option value={"Casino"}>Casino</option>
                    <option value={"Casino Live"}>Casino Live</option>
                    <option value={"Virtual Games"}>Virtual Games</option>
                </select>
                
                <select name="providers" id="providers" onChange={handleChange}>
                        {
                            providersx.map((provider, key) => {
                                return (
                                    <option value={provider} key={key}>{provider}</option>
                                    )
                                })
                            }
                </select>

                <input type="search" placeholder="Search game... (Min. 4 characters)" name="searchGame" onChange={handleSearch} />
                <button onClick={handleClick}><SearchIcon /> Search</button>
            </div>
        </div>
    )
}

export default Filter