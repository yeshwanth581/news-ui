export default function NewsCard({ info }) {
  return (
    <div className="news-container">
      <div className="image">
        {info.urlToImage ? <img src={info.urlToImage} alt={info.title} width="460" height="345"/> : null}
      </div>
      <div className="title">
        <div>{info.title}</div>
      </div>
      <div className="footer">
        <div className="author">
          <div>- {info.author} via {info.source.name}</div>
        </div>
        <div className="content">
          <a href={info.url} target="_blank"  rel="noreferrer">View Source</a>
        </div>
      </div>
    </div>
  );
}
