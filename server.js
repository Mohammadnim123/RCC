'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
const superagent = require('superagent');
const { response, request } = require('express');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
const methodOverride = require('method-override');
const { render } = require('ejs');
app.use(methodOverride('_method'));
const bodyParse = require("body-parser");
const path = require("path");
app.use(bodyParse.urlencoded({ extended: false }));
// app.use(express.static(assets));
const httpMsgs = require("http-msgs");


///////////////////////////////
// install them in your terminal: 
// npm init
//npm i express cors dotenv superagent pg method-override
// npm i body-parser path http-msgs
//////////////////////////////




app.use(express.static('./public'));

// somehow to be able to use post
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//to make the server look for views folder
app.set('view engine', 'ejs');


// ------------------------------------Dana-----------------------
app.get('/pages/news', (req, res) => {
    res.render('pages/news');
})
// app.get('/', (req, res) => {
//     res.render('index');
// })


app.get('/', (req, res) => {
    res.render('welcome',{name:'' , user:''})
})

app.get('/news', (req, res) => {
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
                    // console.log(results.rows);
                    // res.render('pages/news', {results: results.rows});
                    res.render('pages/news', { signin: userArray, newsData: newsArray, results: results.rows });
                })

        })
});

function News(data) {
    this.title = data.title;
    if (data.urlToImage) {
        this.urlToImage = data.urlToImage;
    } else { this.urlToImage = `https://previews.123rf.com/images/artinspiring/artinspiring1805/artinspiring180500364/101214558-politics-concept-illustration-idea-of-political-institution-.jpg`; }

    this.url = data.url;
    this.author = data.author;

    if (data.content) { this.content = data.content.slice(0, data.content.indexOf("[")); }
    else { this.content = this.description; }
    this.publishedAt = data.publishedAt;
}
// ----------------------------------------------------------------



// ------------------------------------Basma-----------------------

app.get('/health', (req, res) => {
    let health_API = process.env.health_API;
    let url = `http://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=${health_API}`;
    let healthArray = [];
    superagent(url)
        .then(result => {
            healthArray = result.body.articles.map(item => {
                return new Health(item);
            })
            // res.status(200).json(healthArray);
            let SQL2 = `SELECT * FROM healthcomments;`;
            client.query(SQL2)
                .then(results => {
                    // console.log(results.rows);
                    // res.render('pages/health', {results: results.rows});
                    res.render('pages/health', { signin: userArray, healthData: healthArray, results: results.rows });
                })

        })
});

function Health(data) {
    this.title = data.title;
    if (data.urlToImage) {
        this.urlToImage = data.urlToImage;
    } else { this.urlToImage = `https://www.phoneworld.com.pk/wp-content/uploads/2020/03/Digitization-health-sector-Pakistan.jpg`; }
    this.author = data.author;
    if (data.content) { this.content = data.content.slice(0, data.content.indexOf("[")); }
    else { this.content = this.description; }
    this.publishedAt = data.publishedAt;
    this.url = data.url;
}
// ----------------------------------------------------------------



// ------------------------------------Nimrawi-----------------------

app.get('/tech', (req, res) => {
    let Tech_API = process.env.Tech_API;
    let url = `http://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=${Tech_API}`;
    let techArray = [];
    superagent(url)
        .then(result => {
            techArray = result.body.articles.map(item => {
                return new Tech(item);
            })
            // res.status(200).json(techArray);
            let SQL2 = `SELECT * FROM techcomments;`;
            client.query(SQL2)
                .then(results => {
                    // console.log(results.rows);
                    // res.render('pages/tech', {results: results.rows});
                    res.render('pages/tech', { signin: userArray, techData: techArray, results: results.rows });
                })

        })
});

function Tech(data) {
    this.title = data.title;
    if (data.urlToImage) {
        this.urlToImage = data.urlToImage;
    } else { this.urlToImage = `https://i.nextmedia.com.au/News/CRN_690_coding.jpg`; }

    this.url = data.url;
    this.author = data.author;
    if (data.content) { this.content = data.content.slice(0, data.content.indexOf("[")); }
    else { this.content = this.description; }
    this.publishedAt = data.publishedAt;
}

app.post('/addfavorite', (req, res) => {
    let { category, urlToImage, author, title, url, publishedAt, content } = req.body;
    let SQL = `INSERT INTO favorite (user_name,userimg,category, urltoimage, author, title, url, publishedat, content) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`;
    let values = [user_name, userimg, category, urlToImage, author, title, url, publishedAt, content];
    client.query(SQL, values);
});

app.get('/favorite', (req, res) => {
    let SQL = `SELECT * FROM favorite where user_name = $1 ;`;
    let value = [user_name];
    client.query(SQL,value)
        .then(results => {
            // res.status200).json(results.rows);
            res.render('pages/favorite', { results: results.rows , signin: userArray});
        })
});

app.get('/about', (req, res) => {
    res.render('pages/about');
})

app.delete('/deletefav',(req,res) => {
    let SQL = `DELETE FROM favorite WHERE id=$1 AND user_name=$2;`;
    let values = [req.body.id , user_name];
    client.query(SQL,values)
    .then (()=>{
      res.redirect('/favorite');
    })
})
// ----------------------------------------------------------------



// ------------------------------------Ghafri-----------------------

app.get('/sport', (req, res) => {
    let sport_API = process.env.sport_API;
    let url = `http://newsapi.org/v2/top-headlines?category=sport&country=us&apiKey=${sport_API}`;
    let sportArray = [];
    superagent(url)
        .then(result => {
            sportArray = result.body.articles.map(item => {
                return new Sport(item);
            })
            // res.status(200).json(sportArray);
            let SQL2 = `SELECT * FROM sportcomments;`;
            client.query(SQL2)
                .then(results => {
                    // console.log(results.rows);
                    // res.render('pages/sport', {results: results.rows});
                    res.render('pages/sport', { signin: userArray, sportData: sportArray, results: results.rows });
                })

        })
});

function Sport(data) {
    this.title = data.title;
    if (data.urlToImage) {
        this.urlToImage = data.urlToImage;
    } else { this.urlToImage = `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR68KlBNlBfL6n8ujQTRzl6X0YBTIcmLhDXEQ&usqp=CAU`; }
    this.author = data.author;
    if (data.content) { this.content = data.content.slice(0, data.content.indexOf("[")); }
    else { this.content = this.description; }
    this.publishedAt = data.publishedAt;
    this.url = data.url;
}
// ----------------------------------------------------------------

//----------------------------Wheather-----------------------------
app.get('/index', (request, response) => {
    // const city = request.query.city;
    let key = process.env.WEATHERBIT_KEY;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=amman&key=${key}`;
    let newWeather = [];
    superagent(url).then(weather => {
        // response.send(weather.body)
        newWeather = weather.body.data.map(element => {
            // console.log(element)
            return new Weather(element);
        })
        // console.log(newWeather);
        response.render('index', { outpot: newWeather });
    })
});

function Weather(day) {
    this.description = day.weather.description;
    this.hTemp = day.max_temp;
    this.icon = `https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`
    this.time = new Date(day.valid_date).toString().slice(0, 15);
}
//-----------------------------------------------------------------




//---------------------------------search-------------------------------


app.get('/searches', (req, res) => {
    res.render('pages/searches');
})

app.post('/tosearch', (req, res) => {
    // console.log(req.body.search);
    let toSearch = req.body.search;
    let NEWS_API = process.env.NEWS_API;
    let url = `https://newsapi.org/v2/everything?q=${toSearch}&apiKey=${NEWS_API}`;
    let searchArray = [];

    superagent(url)
        .then(result => {
            searchArray = result.body.articles.map(item => {
                return new Search(item);
            })
            let SQL2 = `SELECT * FROM searchcomments;`;
            client.query(SQL2)
                .then(results => {
                    res.render('pages/searches', { signin: userArray, searchData: searchArray, results: results.rows });
                })

        })
})

function Search(data) {
    this.title = data.title;
    if (data.urlToImage) {
        this.urlToImage = data.urlToImage;
    } else { this.urlToImage = `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR68KlBNlBfL6n8ujQTRzl6X0YBTIcmLhDXEQ&usqp=CAU`; }
    this.description = data.description;
    this.url = data.url;
}

//------------------------------------------------------------------------


//--------------------------users-----------------------------------------
var user_name = 'RCC User';
var first_name = 'RCC User';
var last_name = 'RCC User';

var userimg = '/img/person.png';
app.post('/signup', (req, res) => {
    res.render('pages/signuppage');
})

app.post('/signingup', (req, res) => {
    userArray = [];

     user_name = req.body.user_name;
    let email = req.body.email;
     first_name = req.body.first_name;
     last_name = req.body.last_name;
    let password = req.body.password;
    let gender = req.body.gender;
    if (gender == 'Male') { userimg = `/img/person.png ` }
    if (gender == 'Female') { userimg = `/img/woman.png` }
let SQL2 = 'SELECT * FROM  users WHERE user_name= $1;'
let val2 = [user_name];
client.query(SQL2,val2)
.then(userResults => {
    console.log(userResults.rows)
if(userResults.rows.length != 0){
  
    res.render('welcome',{name:'This username is used', user : ''})

}

else{
    let SQL = 'INSERT INTO users (user_name,password,userimg,email,first_name,last_name) VALUES ($1,$2,$3,$4,$5,$6);';
    let values = [user_name, password, userimg,email,first_name,last_name];
    client.query(SQL, values)
        .then(results => {
            userArray.push(first_name);
            userArray.push(last_name);
            userArray.push(userimg);
            res.redirect('/index');
        })
    }
})
})
var userArray = [];

app.post('/signin', (req, res) => {
    res.render('pages/signinpage');
})

app.post('/signingin', (req, res) => {
    userArray = [];
    // user_name = req.body.user_name;
    let password = req.body.password;
    // console.log(req.body.user_name);
    // console.log(req.body.password);

    // userimg =  results.rows.userimg;
    let SQL = 'SELECT * FROM  users WHERE user_name= $1 AND password=$2;';
    let values = [req.body.user_name, password];
    client.query(SQL, values)
        .then(results => {
            console.log(results.rows);
            if (results.rows) {
                console.log(results.rows[0].first_name);
                first_name = results.rows[0].first_name;
                last_name = results.rows[0].last_name;
                userimg = results.rows[0].userimg;
                userArray.push(first_name);
                userArray.push(last_name);
                userArray.push(userimg);
                res.redirect('/index');
            }

        })
        .catch(()=>{
            res.render('welcome',{name:'', user:'username or password is wrong '})
        })

})

app.post('/signout', (req, res) => {
    user_name = 'RCC User';
    res.redirect('/');
})

//-------------------------------------------------------------------------

//-----------------------------Dashboard------------------------------------


app.post('/share', (req, res) => {
    console.log(user_name);
    let { category, urlToImage, author, title, url, publishedAt, content } = req.body;
    let SQL = `INSERT INTO dashboard (first_name, last_name,user_name,userimg,category, urltoimage, author, title, url, publishedat, content) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`;
    let values = [first_name, last_name,user_name, userimg, category, urlToImage, author, title, url, publishedAt, content];
    client.query(SQL, values)
        .then(() => {
            res.redirect('/dashboard');
        })


});

app.get('/dashboard', (req, res) => {
    let SQL = `SELECT * FROM dashboard;`;
    client.query(SQL)
        .then(results => {
            res.render('pages/dashboard', { signin: userArray, results: results.rows });
        })
});

//--------------------------------------------------------------------------


//-----------------------------------comments-----------------------------------

app.post('/ncomments', (req, res) => {
    let postNum = 0;

    let SQL = `INSERT INTO comments (post,userimg,title,user_name,comment,first_name,last_name) VALUES ($1,$2,$3,$4,$5,$6,$7);`;
    let values = [postNum, userimg, req.body.title, user_name, req.body.text,first_name,last_name];
    client.query(SQL, values)
        .then(() => {
            httpMsgs.sendJSON(req, res, {
                userimg: userimg,
                user_name: `${first_name} ${last_name}`,
                comment: req.body.text

            })

        })


})



app.post('/scomments', (req, res) => {
    let postNum = 0;

    let SQL = `INSERT INTO sportcomments (post,userimg,title,user_name,comment) VALUES ($1,$2,$3,$4,$5);`;
    let values = [postNum, userimg, req.body.title, user_name, req.body.text];
    client.query(SQL, values)
        .then(() => {
            httpMsgs.sendJSON(req, res, {
                userimg: userimg,
                user_name: `${first_name} ${last_name}`,
                comment: req.body.text

            })

        })


})





app.post('/tcomments', (req, res) => {
    let postNum = 0;

    let SQL = `INSERT INTO techcomments (post,userimg,title,user_name,comment) VALUES ($1,$2,$3,$4,$5);`;
    let values = [postNum, userimg, req.body.title, user_name, req.body.text];
    client.query(SQL, values)
        .then(() => {
            httpMsgs.sendJSON(req, res, {
                userimg: userimg,
                user_name: `${first_name} ${last_name}`,
                comment: req.body.text

            })

        })


})




app.post('/hcomments', (req, res) => {
    let postNum = 0;

    let SQL = `INSERT INTO healthcomments (post,userimg,title,user_name,comment) VALUES ($1,$2,$3,$4,$5);`;
    let values = [postNum, userimg, req.body.title, user_name, req.body.text];
    client.query(SQL, values)
        .then(() => {
            httpMsgs.sendJSON(req, res, {
                userimg: userimg,
                user_name: `${first_name} ${last_name}`,
                comment: req.body.text

            })

        })


})


//--------------------------------------------------------------------------------














app.get('*', notFound);

app.use(errors);

function notFound(req, res) {
    res.status(404).send('Not Found');
}
function errors(error, req, res) {
    res.status(500).send(error);
}


client.connect()
    .then(() => {
        app.listen(PORT, () =>
            console.log(`listening on ${PORT}`)
        );
    })