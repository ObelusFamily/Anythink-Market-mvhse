import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import agent from "../../agent";
import { APPLY_TITLE_FILTER } from "../../constants/actionTypes";
import logo from "../../imgs/logo.png";

const mapDispatchToProps = (dispatch) => ({
  onSearch: (titleQuery, pager, payload) =>
    dispatch({ type: APPLY_TITLE_FILTER, titleQuery, pager, payload }),
});

const Banner = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 2) {
      onSearch(
        query,
        (page) => agent.Items.all(page, query),
        agent.Items.all(0, query)
      );
    } else {
      onSearch(query, (page) => agent.Items.all(page), agent.Items.all(0));
    }
  }, [query, onSearch]);

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div className="d-flex justify-content-center form-inline mx-5">
          <span id="get-part">A place to get</span>
          <div className="input-group flex-grow-1 mx-2">
            <input
              type="text"
              placeholder="What is it that you truly desire?"
              id="search-box"
              className="form-control form-control-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default connect({}, mapDispatchToProps)(Banner);
