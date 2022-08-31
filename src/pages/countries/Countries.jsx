import React, { useEffect } from 'react'
import { useState } from 'react';

const getCountries = async (setCountries) => {
  await fetch("https://date.nager.at/api/v3/AvailableCountries")
    .then(response => response.json())
    .then(data => setCountries(data));
};

const getHolidayByCountry = async (countryCode, setHolidaysByCountry) => {
  await fetch(`https://date.nager.at/api/v3/PublicHolidays/2022/${countryCode}`)
    .then(response => response.json())
    .then(data => setHolidaysByCountry(data));
};

function Countries() {
  const [countries, setCountries] = useState([]);
  const [holidaysByCountry, setHolidaysByCountry] = useState([]);

  useEffect(() => {
    getCountries(setCountries);
  }, []);

  const countryOptions = () => {
    return countries.map((country) => {
      return (
        <option value={country.countryCode} key={country.countryCode}>
          {country.name}
        </option>
      )
    });
  };

  const renderHolidays = () => {
    return holidaysByCountry.map((holiday, index) => {
      return (
        <div key={index}>
          <span>{holiday.name}</span>
        </div>
      )
    });
  };

  const handleSelectChange = (e) => {
    getHolidayByCountry(e.target.value, setHolidaysByCountry);
  };

  return (
    <div>
      <select name="countries" onChange={(e) => handleSelectChange(e)}>
        {countryOptions()}
      </select>
      <section>
        {renderHolidays()}
      </section>
    </div>
  )
}

export default Countries;
