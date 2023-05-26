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
      <h2>Weather in {country.capital}</h2>

      {/* <p>
        lat: {country.capitalInfo.latlng[0]}, long:
        {country.capitalInfo.latlng[1]}
      </p> */}
      <p>Temperature:{} </p>

      <p>Wind: </p>
    </div>
  );
};

export default DataCountry;
