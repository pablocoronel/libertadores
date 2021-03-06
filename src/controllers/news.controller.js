const fetch = require('node-fetch');
const dateFormat = require('dateformat');
const newsController = {};

// API google news
var urlGoogleNews =
	'http://newsapi.org/v2/everything?' +
	'qInTitle=libertadores&' +
	'sortBy=publishedAt&' +
	'language=es&' +
	'page=1&' +
	'apiKey=2a9124124e264915a0da4725646e9214';

// Funciones
newsController.renderNews = async (req, res) => {
	let articles = [];
	try {
		const res = await fetch(urlGoogleNews);
		const news = await res.json();

		if (news.status === 'ok') {
			news.articles.map((item) => {
				item.publishedAt = dateFormat(item.publishedAt, 'dd/mm/yyyy');
			});

			articles = news.articles;
		}
	} catch (error) {
		console.log(error);
	}

	res.render('news', { articles });
};

module.exports = newsController;
