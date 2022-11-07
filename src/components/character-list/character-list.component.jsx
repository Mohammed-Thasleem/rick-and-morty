import { gql, useLazyQuery } from "@apollo/client";
import Spinner from "../spinner/spinner.component";
import CharacterCard from "../character-card/character-card.component";
import SearchBox from "../search/search.component";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import Filter from "../filter/filter.component";
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
  const [species, setSpecies] = useState(null);
  const [status, setStatus] = useState(null);
  const [gender, setGender] = useState(null);

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
    getCharactersList({
      variables: {
        filter: {
          name: searchField,
          species: species,
          status: status,
          gender: gender,
        },
      },
    });
  }, [gender, getCharactersList, searchField, species, status]);

  if (error) return "something went wrong";

  return (
    <div className="page-container">
      <h1 className="page-title">Characters</h1>
      <SearchBox
        placeholder="Search for Character"
        setSearchField={setSearchField}
      />
      <p />
      <Filter
        status={status}
        gender={gender}
        species={species}
        setSpecies={setSpecies}
        setStatus={setStatus}
        setGender={setGender}
      />
      <div className="characters-container">
        {loading ? (
          <Spinner />
        ) : !loading && !error && characterList?.results?.length === 0 ? (
          <div>No Matching results found</div>
        ) : (
          characterList?.results?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        )}
      </div>
      <p />
      <Pagination
        onChange={onLoadMore}
        total={characterList?.info?.count}
        responsive
        defaultCurrent={1}
        pageSize={20}
      />
    </div>
  );
};

export default CharacterList;
