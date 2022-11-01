import { gql, useQuery } from "@apollo/client";
import { Input } from "antd";
import Spinner from "../spinner/spinner.component";
import "./character-list.styles.css";
import CharacterCard from "../character-card/character-card.component";

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
// const CHARACTERS = gql`
// query Query($page: Int, $filter: FilterCharacter) {
//   characters(page: $page, filter: $filter) {
//     info {
//       count
//       next
//       pages
//       prev
//     }
//     results {
//       id
//       image
//       name
//       species
//       status
//       gender
//     }
//   }
// }
// `

const { Search } = Input;

const CharacterList = () => {
  const { loading, data, error } = useQuery(CHARACTERS);
  // const { loading, data, fetchMore, error } = useQuery(CHARACTERS, {
  //   variables: { page, filter }
  // })
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
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
