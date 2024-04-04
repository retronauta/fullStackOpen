const Filter = ({ searchQuery, handleQuery }) => {
  return (
    <div>
      Filter shown with
      <input type="text" value={searchQuery} onChange={handleQuery} />
    </div>
  );
};

export default Filter;
