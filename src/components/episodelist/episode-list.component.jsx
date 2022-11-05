import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import { Col, Pagination, Row } from "antd";
import SearchBox from "../search/search.component";
import { useEffect, useState } from "react";
import "./episode-list.styles.css";
// import PaginationComponent from "../pagination/pagination.component";

const EPISODES = gql`
  query Query($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
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

const EpisodeList = () => {
  const [searchField, setSearchField] = useState("");
  const [episodeList, setEpisodeList] = useState([]);
  const [getEpisodeList, { loading, data, error, fetchMore }] = useLazyQuery(
    EPISODES,
    {
      onCompleted: (data) => {
        if (data?.episodes) {
          setEpisodeList(data?.episodes);
        }
      },
    }
  );

  function onSearch() {
    getEpisodeList({
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
    if (result?.data?.episodes) {
      setEpisodeList(result?.data?.episodes);
    }
    console.log(data);
  }

  useEffect(() => {
    getEpisodeList();
  }, []);

  if (error) return <div>something went wrong..</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Episodes</h1>
      <SearchBox
        placeholder="Search for Episode"
        onSearch={onSearch}
        setSearchField={setSearchField}
      />
      <div className="episodes-container">
        {loading ? (
          <Spinner />
        ) : (
          episodeList?.results?.map((episode) => (
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
        )}
        <p />
        <Pagination
          onChange={onLoadMore}
          total={episodeList.info?.count}
          responsive
          defaultCurrent={1}
          pageSize={20}
        />
      </div>
    </div>
  );
};

export default EpisodeList;
