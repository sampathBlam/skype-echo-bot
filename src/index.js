var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3000, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
// Do not pass APP ID and APP Password , to run the server at localhost.
var connector = new builder.ChatConnector();

/**
 * If the chat server needs to be hosted at a definite server location other than localhost,
 * it has to be registered with Microsoft bot framework https://dev.botframework.com/bots/new
 * On registering, you would receive an APP ID and an APP Password, which should be used to create the ChatConnector.
 * 
 * var connector = new builder.ChatConnector({
 *     appId:"REGISTERED_APP_ID_HERE",
 *     appPassword: "REGISTERED_APP_PASSWORD_HERE"
 * });
 */

server.post('/api/messages', connector.listen());

// Bot setup
var bot = new builder.UniversalBot(connector, function (session) {
    
    // Set the received message as the reply.
    var reply = session.message;

    session.send(reply);
});
