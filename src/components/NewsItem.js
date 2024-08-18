import React, { Component } from "react";

const NewsItem= (props)=> {
    let { title, description, url, newsurl, author, date, source } = props;
    return (
      <div>
        <div className="card" style={{ backgroundColor: "#333F48", color: "white" }}>
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{
              left: "90%",
              zIndex: "1",
              color: "white", // Ensure source text color is white
            }}
          >
            {source}
          </span>
          <img
            src={url}
            className="card-img-top"
            alt="..."
            style={{ width: "100%", height: "250px" }}
          />
          <div className="card-body">
            <h5 className="card-title" style={{ color: "white" }}>{title}... </h5>
            <p className="card-text" style={{ color: "white" }}>{description}...</p>
            <p className="card-text">
              <small className="text-muted" style={{ color: "white" }}>
                By {author} on {date}
              </small>
            </p>

            <a href={newsurl} className="btn btn-primary">
              More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
