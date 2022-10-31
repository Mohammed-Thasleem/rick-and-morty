import { gql, useQuery } from "@apollo/client";
import { Card, Input } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import "./character-list.styles.css";

const CHARACTERS = gql`
  query Query {
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

const { Meta } = Card;
const { Search } = Input;

const CharacterList = () => {
  const { loading, data, error } = useQuery(CHARACTERS);
  if (loading) return <Spinner />;
  if (error) return "something went wrong";

  return (
    <div className="page-container">
      <h1 className="page-title">Characters</h1>
      <Search
        style={{ width: 600 }}
        placeholder="Search for Character"
        allowClear
        enterButton="Search"
        size="large"
        // onSearch={onSearch}
      />
      <div className="characters-container">
        {data?.characters?.results.map((character) => (
          <Link to={character.id} key={character.id}>
            <Card
              hoverable
              style={{
                width: 400,
              }}
              cover={<img alt={character.name} src={character.image} />}
            >
              <Meta title={`Name: ${character.name}`} />
              <br />
              <p>{`Gender: ${character.gender}`}</p>
              <p>{`Status: ${character.status}`}</p>
              <p>{`Species: ${character.species}`}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
