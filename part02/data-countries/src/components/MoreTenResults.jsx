import React from "react";
import Country from "./Country";

const MoreTenResults = ({ countries }) => {
  return (
    <div>
      {countries.map(country => (
        <Country country={country} key={country.name.common} />
      ))}
    </div>
  );
};

export default MoreTenResults;
