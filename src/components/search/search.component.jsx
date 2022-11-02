import { Input } from "antd";

const { Search } = Input;

const SearchBox = ({ placeholder, onChangeHandler }) => {
  return (
    <Search
      style={{ width: 600 }}
      placeholder={placeholder}
      allowClear
      enterButton="Search"
      size="large"
      // onSearch={onSearch}
      onChange={onChangeHandler}
    />
  );
};

export default SearchBox;
