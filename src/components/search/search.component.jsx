import { Input } from "antd";
import "./search.styles.scss";

const { Search } = Input;

const SearchBox = ({ placeholder, setSearchField }) => {
  const onSearchChange = (event) => {
    const searchFieldStirng = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldStirng);
  };

  return (
    <Search
      className="search-box"
      style={{ width: 500 }}
      placeholder={placeholder}
      allowClear
      enterButton="Search"
      size="large"
      onChange={onSearchChange}
    />
  );
};

export default SearchBox;
