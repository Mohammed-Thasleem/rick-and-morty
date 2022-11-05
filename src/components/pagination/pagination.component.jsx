import { Pagination } from "antd";
// import { useEffect, useState } from "react";

const PaginationComponent = ({ onChange, total }) => {
  return (
    <>
      <Pagination
        responsive
        defaultCurrent={2}
        onChange={(pageNumber) => {
          onChange(pageNumber);
        }}
        total={total}
        pageSize={20}
      />
    </>
  );
};

export default PaginationComponent;
