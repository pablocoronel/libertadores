const app = require('./server');

app.listen(app.get('port'), () => {
	console.log('libertadores app en puerto:', app.get('port'));
});
