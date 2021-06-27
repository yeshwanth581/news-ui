import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import SearchFilter from "./SearchFilter";
import axios from "axios";
import "./styles.css";

const GET_TOP_NEWS = "http://localhost:3000/news/getTopNews?country=gb"; //https://breezy-fireant-67.loca.lt
const GET_FILTERED_NEWS = "http://localhost:3000/news/getFilteredNews?search=";

export default function App() {
  const [news, setNews] = useState([]);
  const [newsCount, setNewsCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const searchNews = (input) => {
    setPageNum(1);
    setNews([]);
    setNewsCount(0);
    setSearch(input);
    setIsLoading(true);
  };

  const getNews = (url, pageNumber = 1) => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        setNews(data.news.articles);
        setPageNum(pageNumber);
        setNewsCount(data.news.totalResults);
        setIsLoading(false);
      })
      .catch((err) => {
        setNews([]);
        setPageNum(0);
        setNewsCount(0);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let url = search.length ? GET_FILTERED_NEWS + search : GET_TOP_NEWS;
    url += "&page=" + pageNum;
    getNews(url, pageNum);
  }, [search, pageNum]);

  const navigateList = (pagenum) => {
    setIsLoading(true);
    setPageNum(pagenum);
  };

  const newsContainer = () => {
    return (
      <div>
        <div className="news-list">
          {news.map((item) => (
            <NewsCard info={item} />
          ))}
        </div>
        <div className="navigation">
          {20 * pageNum < newsCount ? (
            <>
              {pageNum > 1 ? (
                <button onClick={() => navigateList(pageNum - 1)}>Prev</button>
              ) : null}
              {pageNum}/{newsCount}
              <button onClick={() => navigateList(pageNum + 1)}>Next</button>
            </>
          ) : (
            <>
              {pageNum}/{newsCount}
              <button onClick={() => navigateList(pageNum - 1)}>Prev</button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <SearchFilter searchNews={searchNews} />
      {isLoading ? <p>Loading...</p> : newsContainer()}
    </div>
  );
}
