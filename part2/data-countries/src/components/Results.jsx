import React, { useState } from "react";
import MoreTenResults from "./MoreTenResults";
import DataCountry from "./DataCountry";
import weatherService from "../services/weatherService";

const Results = ({ countries, searchQuery }) => {
  const [weather, setWeather] = useState({});

  const filteredCountries = countries.filter(country => {
    return (
      country.name.common.includes(searchQuery) ||
      country.name.common.toLowerCase().includes(searchQuery)
    );
  });

  const coincidences = filteredCountries.length;

  if (searchQuery && coincidences > 10)
    return <p>Too many matches, specify another filter</p>;

  if (searchQuery && coincidences === 1) {
    return <DataCountry country={filteredCountries[0]} />;
  }

  return (
    <>
      <div>
        {searchQuery ? <MoreTenResults countries={filteredCountries} /> : null}
      </div>
    </>
  );
};

export default Results;
