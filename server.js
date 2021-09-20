require('dotenv').config();
const process   = require( 'process' );
const express   = require( 'express' );
const app       = express();
const http      = require( 'http' ).Server( app );
const fs        = require( 'fs' );

app.use( express.static(__dirname + '/public') );
 
/* Imagens */
app.get( '/pics', ( request, response ) => {
    const files = fs.readdirSync( './public/gallery', { withFileTypes: true }, 'utf-8' );
    const fileNames = [ ];
    files.forEach( file => {
        fileNames.push( file.name );
    } )
    //console.log( fileNames );
    response.json( fileNames );
} )

/* Index.html */
app.get( '/', function( request, response ){
    response.sendFile( __dirname + '/public/index.html' );
} );

/* Gallery.html */
app.get( '/gallery', function( request, response ){
    response.sendFile( __dirname + '/public/gallery.html' );
} );

/* Volunteers.html */
app.get( '/volunt', function( request, response ){
    response.sendFile( __dirname + '/public/volunteers.html' );
} );

/* Providers.html */
app.get( '/prov', function( request, response ){
    response.sendFile( __dirname + '/public/providers.html' );
} );

/* Support.html */
app.get( '/support', function( request, response ){
    response.sendFile( __dirname + '/public/support.html' );
} );

/* SupportChat.html */
app.get( '/chat', function( request, response ){
    response.sendFile( __dirname + '/public/supportChat.html' );
} );

/* Signup.html */
app.get( '/signup', function( request, response ){
    response.sendFile( __dirname + '/public/signup.html' );
} );

/* Account.html */
app.get( '/account', function( request, response ){
    response.sendFile( __dirname + '/public/account.html' );
} );

app.get( '/', ( request, response ) => {
    response.sendFile( `${__dirname}/public/html/index.html` );
} )

http.listen( process.env.PORT || 3306, ( error ) => {
    if ( error ) throw error;
    console.log( 'Server Started' );
} );
