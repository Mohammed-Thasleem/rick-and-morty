import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import { Pagination } from "antd";
import SearchBox from "../search/search.component";
import { useEffect, useState } from "react";
import "./episode-list.styles.scss";
import { Table } from "antd";

const EPISODES = gql`
  query getEpisodes($page: Int, $filter: FilterEpisode) {
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
  const [getEpisodeList, { loading, error, fetchMore }] = useLazyQuery(
    EPISODES,
    {
      onCompleted: (data) => {
        if (data?.episodes) {
          setEpisodeList(data?.episodes);
        }
      },
    }
  );

  const columns = [
    {
      title: "Episode Name",
      dataIndex: "name",
      key: "name",
      render: (text, episode) => {
        return (
          <Link className="link" to={`/episodes/${episode?.key}`}>
            {text}
          </Link>
        );
      },
    },
    {
      title: "Aired Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const data = episodeList?.results?.map((episode) => {
    return {
      key: episode.id,
      name: episode.name,
      date: episode.air_date,
    };
  });

  async function onLoadMore(pageNumber) {
    const result = await fetchMore({
      variables: {
        page: pageNumber,
      },
    });
    if (result?.data?.episodes) {
      setEpisodeList(result?.data?.episodes);
    }
  }

  useEffect(() => {
    getEpisodeList({
      variables: {
        filter: {
          name: searchField,
        },
      },
    });
  }, [getEpisodeList, searchField]);

  if (error) return <div>something went wrong..</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Episodes</h1>
      <SearchBox
        placeholder="Search for Episode"
        setSearchField={setSearchField}
      />
      <div className="episodes-container">
        {loading ? (
          <Spinner />
        ) : !loading && !error && episodeList?.results?.length === 0 ? (
          <h4
            style={{
              textAlign: "center",
              marginTop: 1,
            }}
          >
            No Matching results found
          </h4>
        ) : (
          <Table columns={columns} dataSource={data} pagination={false} />
        )}
        <p />
      </div>
      <Pagination
        onChange={onLoadMore}
        total={episodeList?.info?.count}
        responsive
        defaultCurrent={1}
        pageSize={20}
        showSizeChanger={false}
        hideOnSinglePage
      />
    </div>
  );
};

export default EpisodeList;
