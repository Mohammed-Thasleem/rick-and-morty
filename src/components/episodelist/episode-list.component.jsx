import { gql, useQuery } from "@apollo/client";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import "./episode-list.styles.css";

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

const EpisodeList = () => {
  const { loading, data, error } = useQuery(EPISODES);
  if (loading) return <Spinner />;
  if (error) return <div>something went wrong..</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Episodes</h1>
      <div className="episodes-container">
        {data?.episodes?.results.map((episode) => (
          <ul className="episode-container" key={episode.id} episode={episode}>
            <>
              <Link className="title" to={episode.id}>
                Name: {episode.name}
              </Link>
              <li>Aired Date: {episode.air_date}</li>
            </>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
