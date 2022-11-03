import { gql, useQuery } from "@apollo/client";
import Spinner from "../spinner/spinner.component";
import "./character-list.styles.css";
import CharacterCard from "../character-card/character-card.component";
import SearchBox from "../search/search.component";

// const CHARACTERS = gql`
//   query Query {
//     characters {
//       results {
//         id
//         name
//         status
//         species
//         gender
//         image
//       }
//     }
//   }
// `;
const CHARACTERS = gql`
  query Query($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        image
        name
        species
        status
        gender
      }
    }
  }
`;

const CharacterList = ({ page, filter }) => {
  // const { loading, data, error } = useQuery(CHARACTERS);
  const { loading, data, error } = useQuery(CHARACTERS, {
    variables: { page, filter },
  });
  if (loading) return <Spinner />;
  if (error) return "something went wrong";

  return (
    <div className="page-container">
      <h1 className="page-title">Characters</h1>
      <SearchBox placeholder="Search for Character" />
      <div className="characters-container">
        {data?.characters?.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
