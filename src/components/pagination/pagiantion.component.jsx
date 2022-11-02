import { Pagination } from "antd";

const PaginationComponent = ({ current, onChange, total }) => (
  <Pagination current={current} onChange={onChange} total={total} />
);

export default PaginationComponent;
