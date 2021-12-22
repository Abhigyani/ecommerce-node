/**
 * Third party module imports.
 */
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

/**
 * Node core module imports.
 */
const path = require('path');

/**
 * Local module imports.
 */
const adminDataRoutes = require('./routes/admin.route');
const shopRoutes = require('./routes/shop.route');
const rootDir = require('./utils/path');
const errorHandler = require('./controllers/errorHandler.controller');
const { mongoConnect } = require('./utils/database');

const sequelize = require('./utils/sqldatabase');

const Product = require('./models/product.model');
const User = require('./models/user.model');

/**
 * Created an instance of express.
 * This instance invokes the express and it's return can be used as an event handler.
 */
const app = express();

/**
 * REGISTERING TEMPLATING ENGINE.
 * 
 * - Templating engine allows to load content dynamically.
 * - 'view engine' allows to set the templating engine which would be used for this express app.
 *    Some of the commonly used templating engines are Pug, EJS, Handlebars.
 * - 'views' sets the location of directory where the templating engine would refer to parse the
 *    renderer.
 */

/**
 * EJS Templating Engine.
 */
 app.set('view engine', 'ejs');
 app.set('views', path.join(rootDir, 'views', 'ejs'));

/**
 * Pug Templating Engine.
 */
// app.set('view engine', 'pug');
// app.set('views', path.join(rootDir, 'views', 'pug'));

/**
 * Handlebars Templating Engine.
 * Handlebars templating engine is not supported out-of-the box by express. Hence this needs to 
 * be explicitly registered with express using .engine() method.
 */
// app.engine('handlebars',
//     handlebars(
//         {
//             layoutsDir: path.join(rootDir, 'views', 'handlebars'),
//             defaultLayout: 'main-layout',
//             extname: 'handlebars'
//         }
//     ));
// app.set('view engine', 'handlebars');
// app.set('views', path.join(rootDir, 'views', 'handlebars'));


/**
 * DECODING REQUEST BODY.
 */
app.use(express.urlencoded({ extended: false }));

/**
 * SERVING STATIC FILE.
 * 
 * - Middleware to serve all the static files.
 * - Static files are the ones which can be publicly accessed on the client side.
 * - They do not throw a 404 error even when they are not loaded using express.
 * - Path passed as argument for .static() method marks the complete directory or file as a static content.
 * - All the files inside the static directory will be accessed using path relative to static directory
 *   when referred in express app.
 */
app.use(express.static(path.join(rootDir, 'public')));

/**
 * FILTERING ROUTES IN EXPRESS.
 * 
 * - First argument sent in this method is used to filter the routes.
 * - Any route starting with '/admin' will be handled by to the following middleware.
 */
app.use('/admin', adminDataRoutes);

app.use(shopRoutes);

/**
 * - 404 Error handler.
 * - When the request is done parsing all the middlewares and it could not find the exact match 
 *   for the route and the method of the request in any of the middleware, it will end up in this.
 * - And hence we can justify this as the 404 i.e. URL was not found in any middleware. 
 */
app.use(errorHandler.handle404);

/**
 * Defining relationships in between Product and User models. 
 */
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);

/**
 * - sequelize.sync() method parses all the models defined in the application.
 * - It creates the tables and sets all the attributes for all the respective models defined using .define() method of sequelize object.
 * - If the table already exists then it does not overrides the tables. If it doesn't exist, it creates it.
 * - Table creation command run on every re-run of the server.
 */
sequelize.sync({force: true}).then((result) => {

    /**
     * - app.listen() starts the node server running on 3000 port.
     * - listen() is an abstraction which internally calls http.createServer() and server.listen({args}).
     * - Instance of express 'app' would be invoked on each incoming request to this server.
     */
    app.listen(3000);

}).catch((error) => {
    console.log(error);
});

/**
 * .use: Method intercepts all the HTTP methods. (GET/POST) etc.
 * .post: Method intercepts only the POST methods. Any other HTTP method will never trigger this middleware.
 * .get: Method intercepts only the GET methods. Any other HTTP method will never trigger this middleware.
 */
// app.use('/form', (req, res, next) => {
//     console.log('In form middleware')
//     res.send('<form action="/welcome" method="POST"><input type="text" name="title" /><button type="submit">Submit</button></form>');
// });

// app.post('/welcome', (req, res, next) => {
//     console.log('Welcome middleware');
//     let bodyMsg = req.body;
//     res.send(`<h1>Welcome ${bodyMsg.title} !</h1>`);
// });

/**
 * This is a middleware between the request and the response.
 * There can me 'n'-middlewares between a request and response in express.js
 * Once any request is received, the controls pass from one middleware to another.
 * Each middleware can have some business logic to work upon the incoming request.
 *
 * Control flow of every incoming request in express.
 * REQUEST --> MIDDLEWARE-1 --> MIDDLEWARE-2 --> .... --> MIDDLEWARE-N --> RESPONSE.
 *
 * This is the default middleware triggered on path '/'.
 */
// app.use('/', (req, res, next) => {
//     console.log('In a middleware');

//     /**
//      * This method call allows passing of request to next middleware in line.
//      * If this next is not called then the control of request will never be passed to next stage.
//      */
//     next();     
// });

/**
 * This is the second middleware in line.
 */
// app.use((req, res, next) => {
//     console.log('In another middleware');

//     /**
//      * Here we are sending a response for the incoming request. The request will not die
//      * in between a middleware. Therefore we do need to call next() here.
//      * In case there are any more middlewares followed after this, next() can be called to
//      * invoke them.
//      * NOTE: Once the response is sent from one middleware, no res. can be sent further from
//      * any other middleware inline.
//      */
//     res.send('<h1>Hello World!</h1>');
// })

