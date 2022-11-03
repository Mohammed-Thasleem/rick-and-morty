import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import { Col, Row } from "antd";
import SearchBox from "../search/search.component";
import { useEffect, useState } from "react";
import "./episode-list.styles.css";
import PaginationComponent from "../pagination/pagiantion.component";

// const EPISODES = gql`
//   query Query {
//     episodes {
//       results {
//         id
//         name
//         air_date
//       }
//     }
//   }
// `;
const EPISODES = gql`
  query Query($page: Int) {
    episodes(page: $page) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        name
        air_date
      }
    }
  }
`;

// const { Search } = Input;

const EpisodeList = ({ page }) => {
  // const { loading, data, error } = useQuery(EPISODES);
  const { loading, data, error } = useQuery(EPISODES, {
    variables: { page },
  });

  // const [current, setCurrent] = useState(1);
  // const onChange = (page) => {
  //   console.log(page);
  //   setCurrent(page);
  // };
  let [pageNumber, updatePageNumber] = useState(1);

  const [searchField, setSearchField] = useState("");
  const [filteredEpisodes, setFilteredEpisodes] = useState(
    data?.episodes?.results
  );
  const onSearchChange = (event) => {
    const searchFieldStirng = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldStirng);
  };
  useEffect(() => {
    const newFilteredEpisodes = data?.episodes?.results.filter((episode) => {
      return episode.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredEpisodes(newFilteredEpisodes);
  }, [data?.episodes?.results, searchField]);

  // function onLoadMore(page) {
  //   fetchMore({
  //     variables: {
  //       page: data.episodes.info.next,
  //     },
  //   });
  // }

  if (loading) return <Spinner />;
  if (error) return <div>something went wrong..</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Episodes</h1>
      <SearchBox
        placeholder="Search for Episode"
        onChangeHandler={onSearchChange}
      />
      <div className="episodes-container">
        {searchField.length > 1
          ? filteredEpisodes.map((episode) => (
              <Link
                className="title"
                to={episode.id}
                key={episode.id}
                episode={episode}
              >
                <Row className="episode-container">
                  <Col span={24}>Name: {episode.name}</Col>
                  <Col span={24}>Aired Date: {episode.air_date}</Col>
                </Row>
              </Link>
            ))
          : data?.episodes?.results.map((episode) => (
              <Link
                className="title"
                to={episode.id}
                key={episode.id}
                episode={episode}
              >
                <Row className="episode-container">
                  <Col span={24}>Name: {episode.name}</Col>
                  <Col span={24}>Aired Date: {episode.air_date}</Col>
                </Row>
              </Link>
            ))}
        <br />
        <PaginationComponent
          info={data.episodes.info}
          pageNumber={pageNumber}
          updatePageNumber={updatePageNumber}
          total={51}
        />
      </div>
    </div>
  );
};

export default EpisodeList;
