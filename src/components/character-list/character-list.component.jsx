import { gql, useLazyQuery } from "@apollo/client";
import Spinner from "../spinner/spinner.component";
import CharacterCard from "../character-card/character-card.component";
import SearchBox from "../search/search.component";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import "./character-list.styles.css";

const CHARACTERS = gql`
  query Query($filter: FilterCharacter, $page: Int) {
    characters(filter: $filter, page: $page) {
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

const CharacterList = () => {
  const [searchField, setSearchField] = useState("");
  const [characterList, setCharacterList] = useState([]);

  const [getCharactersList, { loading, error, fetchMore }] = useLazyQuery(
    CHARACTERS,
    {
      onCompleted: (data) => {
        if (data?.characters) {
          setCharacterList(data?.characters);
        }
      },
    }
  );

  function onSearch() {
    getCharactersList({
      variables: {
        filter: {
          name: searchField,
        },
      },
    });
  }

  async function onLoadMore(pageNumber) {
    const result = await fetchMore({
      variables: {
        page: pageNumber,
      },
    });
    if (result?.data?.characters) {
      setCharacterList(result?.data?.characters);
    }
  }

  useEffect(() => {
    getCharactersList();
  }, []);

  if (error) return "something went wrong";

  return (
    <div className="page-container">
      <h1 className="page-title">Characters</h1>
      <SearchBox
        placeholder="Search for Character"
        onSearch={onSearch}
        setSearchField={setSearchField}
      />
      <div className="characters-container">
        {loading ? (
          <Spinner />
        ) : (
          characterList?.results?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        )}
      </div>
      <p />
      <Pagination
        onChange={onLoadMore}
        total={characterList.info?.count}
        responsive
        defaultCurrent={1}
        pageSize={20}
      />
    </div>
  );
};

export default CharacterList;
