import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import "./episode-details.styles.css";

const GET_EPISODE = gql`
  query Query($episodeId: ID!) {
    episode(id: $episodeId) {
      id
      name
      air_date
      characters {
        id
        name
      }
    }
  }
`;

const EpisodeDetails = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_EPISODE, {
    variables: { episodeId: id },
  });

  if (loading) return <Spinner />;
  if (error) return <div>error...</div>;

  return (
    <div className="episode-detail-container">
      <h1 className="episode-name">Episode Name: {data?.episode?.name}</h1>
      <p>Aired Date: {data?.episode?.air_date}</p>
      <div className="dropdown">
        <button className="btn" onClick={handleOpen}>
          Cast
        </button>
        {open ? (
          <div className="menu">
            {data?.episode?.characters.map((character) => (
              <Link className="character-name" key={character.id}>
                {character.name}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EpisodeDetails;
