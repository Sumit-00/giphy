import React from 'react'
import debounce from '../../utils/debounce';

const Search = ({handleSearch}) => {
    const [input, setInput] = React.useState("");

    const debounceSearch = debounce((val) => handleSearch(val), 500);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        debounceSearch(e.target.value);
    }

  return (
    <input placeholder='enter here' value={input} onChange={handleInputChange} />
  )
}

export default Search