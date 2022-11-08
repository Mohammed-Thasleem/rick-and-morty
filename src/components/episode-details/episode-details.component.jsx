import { Card, Collapse, Avatar } from "antd";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import cover from "../../assets/rick-cover.png";
import "./episode-details.styles.scss";

const { Panel } = Collapse;
const { Meta } = Card;

const GET_EPISODE = gql`
  query getEpisodeById($episodeId: ID!) {
    episode(id: $episodeId) {
      id
      name
      episode
      air_date
      characters {
        id
        name
        image
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
      <Card
        hoverable
        style={{
          width: 400,
        }}
        cover={<img alt="cover-img" src={cover} />}
      >
        <Meta title={`Name: ${data?.episode?.name}`} />
        <br />
        <p>Episode : {data?.episode?.episode}</p>
        <p>Aired Date : {data?.episode?.air_date}</p>
        <Collapse>
          <Panel header="Characters">
            {data?.episode?.characters?.map((character) => (
              <ol key={character.id}>
                <Link to={`/${character.id}`} key={character.id}>
                  <div className="character">
                    <Avatar className="image" src={character.image} />
                    <p>{character.name}</p>
                  </div>
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
