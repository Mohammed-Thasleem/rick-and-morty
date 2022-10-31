import { Card, Collapse } from "antd";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import "./episode-details.styles.css";

const { Panel } = Collapse;

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
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_EPISODE, {
    variables: { episodeId: id },
  });

  if (loading) return <Spinner />;
  if (error) return <div>error...</div>;

  return (
    <div className="episode-detail-container" key={data?.episode?.id}>
      <Card title={data?.episode?.name} style={{ width: 300 }}>
        <p>Aired Date: {data?.episode?.air_date}</p>
        <Collapse>
          <Panel header="Characters">
            {data?.episode?.characters?.map((character) => (
              <ol key={character.id}>
                <Link to={character.id} key={character.id}>
                  {character.name}
                </Link>
              </ol>
            ))}
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default EpisodeDetails;
