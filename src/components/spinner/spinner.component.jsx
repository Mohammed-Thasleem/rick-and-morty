// import { LoadingOutlined } from "@ant-design/icons";
// import { Spin } from "antd";

// const Spinner = () => {
//   const antIcon = (
//     <LoadingOutlined
//       style={{
//         fontSize: 24,
//       }}
//       spin
//     />
//   );
//   return <Spin indicator={antIcon} />;
// };

// export default Spinner;

// import "./spinner.styles.css";

// const Spinner = () => (
//   <div className="spinner-container">
//     <div className="spinner"></div>
//   </div>
// );

// export default Spinner;
import { Spin } from "antd";
import "./spinner.styles.css";

const Spinner = () => (
  <div className="spinner">
    <Spin size="large" />
  </div>
);
export default Spinner;
