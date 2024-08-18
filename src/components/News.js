import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} Headlines`;
  }

  async componentDidMount() {
    //USUALLY USED FOR FETCHING DATA FROM API
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=783d1790900b4f7b9a0c8decbdc021c8&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      totalresults: parseddata.totalresults,
      loading: false,
    });
  }

  handlenextclick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 5))) {
      this.setState({ loading: true });
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=783d1790900b4f7b9a0c8decbdc021c8&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({
        articles: parseddata.articles,
        page: this.state.page + 1,
        totalResults: parseddata.totalResults,
        loading: false,
      });
    }
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  handleprevclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=783d1790900b4f7b9a0c8decbdc021c8&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  render() {
    return (
      <div
        className="container my-3"
        style={{ backgroundColor: "#90A4AE", height: "100%", width: "100%" }}
      >
        <h2
          className="text-center"
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            fontSize: "2.5rem", // Make the heading bigger
            color: "#F5F5F5", // Light gray color for the heading
            transition: "transform 0.3s ease-in-out, color 0.3s ease-in-out", // Transition effect for animation
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.color = "#FFFFFF"; // White color on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.color = "#F5F5F5"; // Light gray color when not hovered
          }}
        >
          TOP HEADLINES{" "}
        </h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div
                  key={element.url}
                  className="col-md-4"
                  style={{ marginBottom: "20px" }}
                >
                  <NewsItem
                    title={element.title.slice(0, 40)}
                    description={
                      element.description == null
                        ? " "
                        : element.description.slice(0, 50)
                    }
                    url={
                      element.urlToImage == null
                        ? "https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1718841600&semt=sph"
                        : element.urlToImage
                    }
                    newsurl={element.url}
                    author={element.author == null ? "unknown" : element.author}
                    date={element.publishedAt.split("T")[0]} //the publishedAt function gives: 2024-06-20T09:25:12Z so we split at T and access the element at 0th index to just get the date 2024-06-20
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 5)
            }
            type="button"
            className="btn btn-dark"
            id="nextbutton"
            onClick={this.handlenextclick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
