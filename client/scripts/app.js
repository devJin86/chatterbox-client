// YOUR CODE HERE:


var app = {
    init: function(){//should i be using load?  how do i know how to populate these fields?
    var $login = ("<input type='text' id='login'/>");
	var $chatField = ("<input type='text' id='chatField'/>");
	var $loginButton = ("<button class='loginButton'>Login</button>");
	var $submitButton = ("<button class='submitButton'>Submit</button>");
	var $clearButton = ("<button class='clearButton'>Clear All</button>");
	var $refreshButton = ("<button class='refreshButton'>Refresh</button>");
	var $roomButton = ('<span class="dropdown"><a class="roomMenu" >Room Menu</a></span>');
	var $roomList = ('<span class="submenu"><ul class="root"></ul></span>')
	// var roomIndex = room.length -1 
	// while(roomIndex >= 0){
		// var $roomItem = ('<li ><a href="#Dashboard" >data.room[roomIndex]</a></li>)'
		// $('.submenu').append($roomItem);
	// 	roomIndex--;
	// }
	$('.roomMenu').append($roomList);
	var $chatList = ("<ul id='chatList'>messages</ul>");
//$chatList.text("newmessages");
	$('#chats').append($login);
	$('#chats').append($loginButton);
	$('#chats').append($roomButton);
	$('#chats').append($chatField);
	$('#chats').append($submitButton);
	$('#chats').append($clearButton);
	$('#chats').append($refreshButton);
	$('#chats').append($chatList);


	$('h1').append("<h6>Welcome back</h6>");
	this.fetch();  
    },
    send: function(message){

		$.ajax({
  			// This is the url you should use to communicate with the parse API server.
  			url: 'https://api.parse.com/1/classes/messages',
  			type: 'POST',
  			data: JSON.stringify(message),
  			contentType: 'application/json',
  			success: function (data) {
    		console.log('chatterbox: Message sent');
  			},
  			error: function (data) {
    		// See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    		console.error('chatterbox: Failed to send message', data);
  			}
		});
		this.addMessage(message);
    },
    fetch: function(){	
		 	$.ajax({
  			// This is the url you should use to communicate with the parse API server.
  			url: 'https://api.parse.com/1/classes/messages',
  			type: 'GET',
  			data: "json",
  			contentType: 'application/json',
  			success: function (data) {
    			_.each(data.tweet, function(value){
    			app.addMessage(tweet);
  			});
    		},
  			error: function (data) {
    		// See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    		console.error('chatterbox: Failed to load', data);
  			}
		});  
    },
    clearMessages: function(){
    	$('ul').empty();
    },
    addMessage: function(tweet){
    	var $ul = $('ul');
    	var said = (tweet.text);
    	var speaker = (tweet.username);
    	var $newTweet = $('<li></li>');
    	var $tweeter = $('<button>tweeter</button>');
        var $tweeted = $('<span>tweeted</span>');
        $tweeter.addClass("btn-username");
        $tweeter.data("user", speaker);
        $newTweet.append($tweeter);
        $newTweet.append($tweeted);
        $tweeter.data("user", speaker);
        $tweeter.attr("href", '#');
        $tweeter.text("@" + speaker);
        $tweeted.text(said);
        $newTweet.appendTo($ul);
    },
    addRoom: function(text){
        
    },
};
//Personalizes the page and provides the input field

app.init();
//fetches and loads the data from the server


//creates messages based on user input and sends to server
//?? how does this differ from addMessage?
//?? should init  call fetch?
$('.submitButton').on('click', function(){
	console.log("clicked");
	var $username = $('#login').val();
	var $messageText = $("#chatField").val(); 
	var $message = {
  		username: $username,
  		text: $messageText,
  		roomname: 'lobby'
		}; 
	console.log($message.username);
	app.send($message);
});

$('.clearButton').on('click', app.clearMessages);
$('.loginButton').on('click', app.clearMessages);
$('.refreshButton').on('click', app.fetch);

//Display messages retrieved from the parse server. (Use proper escaping on any user input.)

//Setup a way to refresh the displayed messages (either automatically or with a button)

//Allow users to select a user name for themself and to be able to send messages


//Rooms

//Allow users to create rooms and enter existing rooms - Rooms are defined by the .roomname property of messages, so you'll need to filter them somehow.


//Socializing

//Allow users to 'befriend' other users by clicking on their user name

//Display all messages sent by friends in bold
//
//$.ajax({
  // This is the url you should use to communicate with the parse API server.
 /*
  url: 'https://api.parse.com/1/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});/

*/

