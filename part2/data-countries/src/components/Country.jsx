import React, { useState } from "react";
import DataCountry from "./DataCountry";

const Country = ({ country }) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <p key={country.ccn3}>
        {country.name.common}{" "}
        <button onClick={() => setExpand(!expand)}>show</button>
      </p>
      {expand ? <DataCountry country={country} /> : null}
    </>
  );
};

export default Country;
