const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');




app.use((req, res, next)=>{
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}\nfrom ${req.ip} - ${req.headers['user-agent']}\n`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('unable to append to server log.')
		}
	});
	next();
});


// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs', {
// 		pagetitle : 'Hmmmm | this site',
// 		pageName : 'Well just hold on.....',
// 		message : "We'll be back soon.....\nwe're just updating the site..."
// 	});
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase(text);
});


app.get('/', (req, res)=>{
	res.render('home.hbs', {
		pagetitle : 'Home | this site',
		pageName : 'home',
		welcomeMessage : 'Mlkshk kale chips swag narwhal polaroid heirloom biodiesel truffaut organic locavore. Selfies gastropub portland listicle, unicorn heirloom echo park DIY before they sold out chicharrones. Marfa craft beer you probably have not heard of them intelligentsia synth, glossier mustache blog salvia gochujang scenester man bun. Ennui woke lomo vegan chicharrones, photo booth dreamcatcher microdosing DIY yuccie jianbing vice raclette offal kinfolk.'
	});
});

app.get('/about', (req, res)=>{
	res.render('about.hbs', {
		pagetitle : 'About | this site',
		pageName : 'About'
	});
});

app.get('/bad', (req, res)=>{
	// res.send('<h1>hello Express</h1>');
	res.send({
		errorMessage :'no can do'
	})
});

app.listen(port, () => {
	console.log(`server running on ${port}`);
});