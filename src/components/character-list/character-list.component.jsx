import { gql, useQuery } from "@apollo/client";
import "./character-list.styles.css";
import Spinner from "../spinner/spinner.component";

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

const CharacterList = () => {
  const { loading, data, error } = useQuery(CHARACTERS);
  if (loading) return <Spinner />;
  if (error) return "something went wrong";

  return (
    <div className="page-container">
      <h1 className="page-title">Characters</h1>
      <div className="characters-container">
        {data?.characters?.results.map((character) => (
          <ul
            className="character-container"
            key={character.id}
            character={character}
          >
            <>
              <li>
                <img src={character.image} alt={`character ${character.id}`} />
              </li>
              <li>Name: {character.name}</li>
              <li>Status: {character.status}</li>
              <li>Species: {character.species}</li>
              <li>Gender: {character.gender}</li>
            </>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
