import { Card, Collapse } from "antd";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import "./character-details.styles.scss";

const GET_CHARACTER = gql`
  query getCharacterById($characterId: ID!) {
    character(id: $characterId) {
      id
      image
      name
      origin {
        name
      }
      species
      location {
        name
      }
      gender
      episode {
        id
        name
      }
    }
  }
`;

const { Meta } = Card;
const { Panel } = Collapse;

const CharacterDetails = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_CHARACTER, {
    variables: { characterId: id },
  });

  if (loading) return <Spinner />;
  if (error) return <div>error...</div>;

  return (
    <div className="character-details-container" key={data?.character?.id}>
      <Card
        className="card"
        hoverable
        style={{
          width: 400,
        }}
        cover={<img alt={data.character.name} src={data.character.image} />}
      >
        <Meta title={`Name: ${data.character.name}`} />
        <br />
        <p>{`Gender : ${data.character.gender}`}</p>
        <p>{`Species : ${data.character.species}`}</p>
        <p>{`Origin : ${data.character.origin.name}`}</p>
        <p>{`Location : ${data.character.location.name}`}</p>
        <Collapse>
          <Panel header="Episodes">
            {data?.character?.episode?.map((episode) => (
              <ol key={episode.id}>
                <Link to={`/episodes/${episode.id}`} key={episode.id}>
                  {episode.name}
                </Link>
              </ol>
            ))}
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default CharacterDetails;
