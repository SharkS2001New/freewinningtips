import React from 'react';

const ArticleList = () => {
    const articles = [
        { title: "Football Player Kevin De Bruyne - The Essence of Modern Football", slug: "kevin-de-bruyne-essence-of-modern-football" },
        { title: "Soccer Player Kyle Walker defend from Passion", slug: "kyle-walker-defend-from-passion" },
        { title: "Melbet Bangladesh 2024 Review: Key Highlights and Insights", slug: "melbet-bangladesh-2024-review" },
    ];

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mb-4">
        <div className="col-auto">
          <h2 style={{fontSize: "24px", color: "#11113b",fontFamily: 'Audiowide'}}>Article</h2>
        </div>
        <div className="col-auto">
          <span className="text-danger float right">
            <a href="/article/" target="_blank" style={{color: "#D35244", textDecoration: "none"}}><strong>See more »»</strong></a>
          </span>
        </div>
      </div>
      <div className="row">
        {articles.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="article-card p-3 h-100">
              <h3>{article.title}</h3>
              <a href={`/article/${article.slug}`} className="btn btn-outline-danger btn-sm">Read More »</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
