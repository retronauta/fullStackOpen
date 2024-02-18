import { useEffect, useState } from "react";
import countriesService from "./services/countriesService";
import Results from "./components/Results";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService.getAllCountries().then(data => setCountries(data));
  }, []);

  const handleSearchValue = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      find countries{" "}
      <input
        value={searchQuery}
        onChange={handleSearchValue}
        placeholder="search country..."
      />
      <Results countries={countries} searchQuery={searchQuery} />
    </div>
  );
}

export default App;
