const input                 = document.getElementById( 'input' );
const chat                  = document.getElementById( "chat-messages" );

const APIurl = 'https://pinus-api.herokuapp.com';
//const APIurl = 'http://localhost:3305';

let user;
const chatHandler = new Chat();
let realTime;