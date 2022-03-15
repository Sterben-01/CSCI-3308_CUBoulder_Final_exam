var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory


/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
**********************/


let dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'university_db',
	user: 'postgres',
	password: 'pwd'
};

const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
let db = pgp(dbConfig);






app.get('/', function(req, res) {
	res.render('pages/main')
});

app.get('/main', function(req, res) {
	res.render('pages/main')
});

app.post('/reviews', function(req, res){
	console.log("asasasa")
	var uniname = req.body.uni_name;
	var unireview = req.body.uni_review;
	var time = new Date();
	time = time.toString();
	var insert_statement = `INSERT INTO university_info(university_name, review, review_date) 
	VALUES ('${uniname}', '${unireview}', '${time}') ON CONFLICT DO NOTHING;`;
	var rev_result = 'SELECT * FROM university_info ORDER BY id DESC;';// I decide to use a descending order to display this. THat will be user-friendly
	console.log(uniname)// debug
	console.log(unireview)// debug
	console.log(time) // debug


	db.task('get-everything', task => {
        return task.batch([
            task.any(insert_statement),
            task.any(rev_result)
        ]);
    })
    .then(data => {
    	console.log(data);
      	res.render('pages/reviews',{
      		info:data[1]
      })
    })
    .catch(err => {
            console.log('error', err);
            res.render('pages/main', {
                my_title: 'Home Page',
                data: '',
                color: '',
                color_msg: ''
            })
    });
});

app.get('/reviews', function(req, res) {
	var rev_result = 'SELECT * FROM university_info ORDER BY id DESC;'; // I decide to use a descending order to display this. THat will be user-friendly

  db.task('get-everything', task => {
        return task.batch([
            task.any(rev_result)
        ]);
    })
    .then(data => {
    	res.render('pages/reviews',{
    		info:data[0]
			})
    })
    .catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('pages/reviews', {
                title: 'reviews',
                data: '',
                total_wins: 'Error',
                total_losses: 'Error'
            })
    });

});


//app.listen(3000);
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
