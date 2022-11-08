import { Button, Select } from "antd";
import {
  genderCategory,
  speciesCategory,
  statusCategory,
} from "./filter-category/filter-category-menus";
import "./filter.styles.scss";

const Filter = ({
  species,
  status,
  gender,
  setSpecies,
  setStatus,
  setGender,
}) => {
  const clearFilter = () => {
    setSpecies(null);
    setStatus(null);
    setGender(null);
  };

  function handleChange(value, setState) {
    setState(value);
  }

  return (
    <div className="filter-container">
      {/* <p /> */}
      <Select
        placeholder="Species"
        style={{
          width: 120,
        }}
        value={species}
        onChange={(value) => handleChange(value, setSpecies)}
        options={speciesCategory.map((item) => {
          return { value: `${item}`, label: `${item}` };
        })}
      />

      <Select
        placeholder="Status"
        style={{
          width: 120,
        }}
        value={status}
        onChange={(value) => handleChange(value, setStatus)}
        options={statusCategory.map((item) => {
          return { value: `${item}`, label: `${item}` };
        })}
      />

      <Select
        placeholder="Gender"
        style={{
          width: 120,
        }}
        value={gender}
        onChange={(value) => handleChange(value, setGender)}
        options={genderCategory.map((item) => {
          return { value: `${item}`, label: `${item}` };
        })}
      />
      <Button type="primary" onClick={clearFilter}>
        Clear Filter
      </Button>
      <p />
    </div>
  );
};

export default Filter;
