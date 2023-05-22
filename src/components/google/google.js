import React, { useEffect, useState } from 'react';
import styles from './google.module.css';





const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [matchedStates, setMatchedStates] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('http://cdn-api.co-vin.in/api/v2/admin/location/states');
        const data = await response.json();
        setStates(data.states);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setQuery(userInput);

    // Filter states based on user input
    const matched = states.filter((state) =>
      state.state_name.toLowerCase().includes(userInput.toLowerCase())
    );
    setMatchedStates(matched);
  };

  const handleStateSelection = (selectedState) => {
    setQuery(selectedState.state_name);
    setMatchedStates([]);
  };

  return (
    <div className={styles['search-bar-container']}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className={styles['search-bar-input']}
      />

      {matchedStates.length > 0 && (
        <ul className={styles['search-bar-list']}>
          {matchedStates.map((state) => (
            <li
              key={state.state_id}
              onClick={() => handleStateSelection(state)}
              className={styles['search-bar-item']}
            >
              {state.state_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;