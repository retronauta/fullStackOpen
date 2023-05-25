import React from "react";

const DataCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <h3>Languages</h3>

      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt="Flag of country" />
    </div>
  );
};

export default DataCountry;
