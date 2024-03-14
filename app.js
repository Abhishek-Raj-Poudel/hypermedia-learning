const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();


//Lets asume we have a database with atleast 20 contacts
const contacts = [
	{ id: 1, first: 'John', last: 'Doe', phone: '123-456-7890', email: 'john@example.com' },
	{ id: 2, first: 'Jane', last: 'Smith', phone: '987-654-3210', email: 'jane@example.com' },
	{ id: 3, first: 'Michael', last: 'Johnson', phone: '555-123-4567', email: 'michael@example.com' },
	{ id: 4, first: 'Emily', last: 'Brown', phone: '111-222-3333', email: 'emily@example.com' },
	{ id: 5, first: 'Daniel', last: 'Williams', phone: '444-555-6666', email: 'daniel@example.com' },
	{ id: 6, first: 'Olivia', last: 'Miller', phone: '777-888-9999', email: 'olivia@example.com' },
	{ id: 7, first: 'James', last: 'Jones', phone: '333-444-5555', email: 'james@example.com' },
	{ id: 8, first: 'Sophia', last: 'Davis', phone: '666-777-8888', email: 'sophia@example.com' },
	{ id: 9, first: 'William', last: 'Garcia', phone: '222-333-4444', email: 'william@example.com' },
	{ id: 10, first: 'Ava', last: 'Martinez', phone: '888-999-0000', email: 'ava@example.com' },
	{ id: 11, first: 'Alexander', last: 'Rodriguez', phone: '111-222-3333', email: 'alexander@example.com' },
	{ id: 12, first: 'Mia', last: 'Hernandez', phone: '999-000-1111', email: 'mia@example.com' },
	{ id: 13, first: 'Ethan', last: 'Lopez', phone: '222-333-4444', email: 'ethan@example.com' },
	{ id: 14, first: 'Isabella', last: 'Gonzalez', phone: '555-666-7777', email: 'isabella@example.com' },
	{ id: 15, first: 'Michael', last: 'Wilson', phone: '888-999-0000', email: 'michael2@example.com' },
	{ id: 16, first: 'Emma', last: 'Anderson', phone: '777-888-9999', email: 'emma@example.com' },
	{ id: 17, first: 'Noah', last: 'Taylor', phone: '333-444-5555', email: 'noah@example.com' },
	{ id: 18, first: 'Charlotte', last: 'Thomas', phone: '666-777-8888', email: 'charlotte@example.com' },
	{ id: 19, first: 'Liam', last: 'Harris', phone: '123-456-7890', email: 'liam@example.com' },
	{ id: 20, first: 'Aria', last: 'Jackson', phone: '555-666-7777', email: 'aria@example.com' }
];

// Configure Mustache.js as the template engine
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//Define a route to render the template
app.get('/', (req, res) => {
	res.redirect('/contact')
})

app.get('/contact', (req, res) => {
	// we will add a feature to show all searchable list of contacts
	res.render('contact');
})

app.get('/contacts', (req, res) => {
	const search = req.query.q
	let contact;
	if (search) {
		let filteredContent = contacts.filter(contact =>
			contact.first.toLowerCase().includes(search.toLowerCase()) ||
			contact.last.toLowerCase().includes(search.toLowerCase()) ||
			contact.phone.includes(search.toLowerCase()) ||
			contact.email.toLowerCase().includes(search.toLowerCase())
		);
		contact = filteredContent
	}
	else {
		contact = contacts
	}

	res.render("contactSearch.html",{search,contact})
})


app.get('/contacts/new', (req, res) => {
	const  errors = {email:"error 1",phone: "error 2",bank:"error 3",lottary:"error 4"}
	res.render('new',{errors});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
