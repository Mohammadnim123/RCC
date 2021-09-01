const superagent = require("superagent");
const client = require('./client');
let userArray = []



const news = (req, res ) => {
  let NEWS_API = process.env.NEWS_API;
  let url = `http://newsapi.org/v2/top-headlines?category=politics&country=us&apiKey=${NEWS_API}`;
  let newsArray = [];
  superagent(url)
      .then(result => {
          newsArray = result.body.articles.map(item => {
              return new News(item);
          })
          // res.status(200).json(newsArray);
          let SQL2 = `SELECT * FROM comments;`;
          client.query(SQL2)
              .then(results => {

                  res.render('pages/news', { signin: userArray, newsData: newsArray, results: results.rows });
              })

      })
};

function News(data) {
  this.title = data.title;
  if (data.urlToImage) {
    this.urlToImage = data.urlToImage;
  } else {
    this.urlToImage = `https://previews.123rf.com/images/artinspiring/artinspiring1805/artinspiring180500364/101214558-politics-concept-illustration-idea-of-political-institution-.jpg`;
  }

  this.url = data.url;
  this.author = data.author;

  if (data.content) {
    this.content = data.content.slice(0, data.content.indexOf("["));
  } else {
    this.content = this.description;
  }
  this.publishedAt = data.publishedAt;
}

// module.exports=news

module.exports = news
