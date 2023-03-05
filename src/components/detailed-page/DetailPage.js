import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import "./DetailPage.css";

const DetailPage = () => {
  const { owner, repo } = useParams();

  const [repoData, setRepoData] = useState();

  useEffect(() => {
    getRepoDetails();
  }, []);

  const getRepoDetails = async () => {
    let response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    if (response.data) {
      setRepoData(response.data);
    }
  };

  return (
    <>
      <div className="detail">
        <p className="detail-title">{repo}</p>
        <div className="result-search">
          <a href="/">Back to search </a>
        </div>
        {repoData ? (
          <>
            <div className="detail-container">
              <p>
                <span className="detail-container-key">Description:</span>{" "}
                {repoData.description}
              </p>
              <p>
                <span className="detail-container-key">Owner Name:</span>{" "}
                {owner}
              </p>
              <p>
                <span className="detail-container-key">Language:</span>{" "}
                {repoData.language}
              </p>
              <p>
                <span className="detail-container-key">Liscense:</span>{" "}
                {repoData.license?.name ? (
                  repoData.license?.name
                ) : (
                  <span className="data-placeholder">Not available</span>
                )}
              </p>
              <p>
                <span className="detail-container-key">Forks:</span>{" "}
                {repoData.forks ? (
                  repoData.forks
                ) : (
                  <span className="data-placeholder">Not available</span>
                )}
              </p>
              <p>
                <span className="detail-container-key">Watchers:</span>{" "}
                {repoData.watchers ? repoData.watchers : 0}
              </p>
              <p>
                <span className="detail-container-key">Organization URL:</span>{" "}
                {repoData.owner?.organizations_url ? (
                  <a
                    href={repoData.owner?.organizations_url}
                    target="_blank"
                    style={{ wordWrap: "break-word" }}
                  >
                    {repoData.owner?.organizations_url}
                  </a>
                ) : (
                  <span className="data-placeholder">Not available</span>
                )}
              </p>
              <p>
                <span className="detail-container-key">Created On:</span>{" "}
                {repoData.created_at ? (
                  repoData.created_at
                ) : (
                  <span className="data-placeholder">Not available</span>
                )}
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default DetailPage;
