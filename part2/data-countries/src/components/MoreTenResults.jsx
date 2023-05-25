import React from "react";

const MoreTenResults = ({ countries }) => {
  return (
    <div>
      {countries.map(country => (
        <p key={country.ccn3}>{country.name.common}</p>
      ))}
    </div>
  );
};

export default MoreTenResults;
