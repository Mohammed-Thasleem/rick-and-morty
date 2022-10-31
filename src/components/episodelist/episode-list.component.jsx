import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import "./episode-list.styles.css";
import { Col, Row, Input } from "antd";

const EPISODES = gql`
  query Query {
    episodes {
      results {
        id
        name
        air_date
      }
    }
  }
`;

const { Search } = Input;

const EpisodeList = () => {
  const { loading, data, error } = useQuery(EPISODES);
  if (loading) return <Spinner />;
  if (error) return <div>something went wrong..</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Episodes</h1>
      <Search
        style={{ width: 600 }}
        placeholder="Search for Episode"
        allowClear
        enterButton="Search"
        size="large"
        // onSearch={onSearch}
      />
      <div className="episodes-container">
        {data?.episodes?.results.map((episode) => (
          <Link
            className="title"
            to={episode.id}
            key={episode.id}
            episode={episode}
          >
            <Row className="episode-container">
              <Col span={24}>Name: {episode.name}</Col>
              <Col span={24}>Aired Date: {episode.air_date}</Col>
            </Row>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
