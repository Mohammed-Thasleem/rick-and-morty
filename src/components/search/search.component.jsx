import { Input } from "antd";

const { Search } = Input;

const SearchBox = ({ placeholder, setSearchField, onSearch }) => {
  const onSearchChange = (event) => {
    const searchFieldStirng = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldStirng);
  };

  return (
    <Search
      style={{ width: 600 }}
      placeholder={placeholder}
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      onChange={onSearchChange}
    />
  );
};

export default SearchBox;
