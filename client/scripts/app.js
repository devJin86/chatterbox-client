// YOUR CODE HERE:
var dataResults;
var roomList = {};
var friends = {};
var currentRoom;

var app = {
    init: function() {//should i be using load?  how do i know how to populate these fields?
      console.log("init");
    var $login = ("<input type='text' id='login'/>");
	  var $chatField = ("<input type='text' id='chatField'/>");
    var $newRoom = ("<input type='text' class='newRoom'/>");
    var $roomCreate = ("<button class='roomCreate'>Create Room</button>");
	  var $loginButton = ("<button class='loginButton'>Login</button>");
	  var $submitButton = ("<button class='submitButton'>Submit</button>");
	  var $clearButton = ("<button class='clearButton'>Clear All</button>");
	  var $refreshButton = ("<button class='refreshButton'>Refresh</button>");
	  var $roomMenu = ('<select class="roomMenu">Room Menu</select>');
  	// var roomIndex = room.length -1 
  	// while(roomIndex >= 0){
  		// var $roomItem = ('<li ><a href="#Dashboard" >data.room[roomIndex]</a></li>)'
  		// $('.submenu').append($roomItem);
  	// 	roomIndex--;
  	// }
  	var $chatList = ("<ul class = 'container' id='chatList'>messages</ul>");
  //$chatList.text("newmessages");
  	$('#chats').append($login);
  	$('#chats').append($loginButton);
    $('#chats').append($newRoom);
    $('#chats').append($roomCreate);
  	$('#chats').append($roomMenu);
  	$('#chats').append($chatField);
  	$('#chats').append($submitButton);
  	$('#chats').append($clearButton);
  	$('#chats').append($refreshButton);
  	$('#chats').append($chatList);


	$('h1').append("<h2>Welcome back</h2>");
	this.fetch();  
    },
    send: function(message) {

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
    fetch: function() {	
      console.log("fetching data");
		 	$.ajax({
  			// This is the url you should use to communicate with the parse API server.
  			url: 'https://api.parse.com/1/classes/messages',
  			type: 'GET',
  			data: "json",
  			contentType: 'application/json',
  			success: function (data) {
          dataResults = data;
    			_.each(data.results, function(value) {
    			  app.addMessage(value);
  			  });
          data.results.forEach(function(val, idx) {
            roomList[val.roomname] = val.roomname; 
          });
          for (var prop in roomList) {
            var $roomName = ('<option>' + prop + '</option>');
            $('.roomMenu').append($roomName); 
          }
          
    		},
  			error: function (data) {
    		// See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    		console.error('chatterbox: Failed to load', data);
  			}
		});  
    },
    clearMessages: function() {
    	$('ul').empty();
    },
    addMessage: function(tweet) {
      console.log('adding messages');
    	var $ul = $('ul');
    	var said = (tweet.text);
    	var speaker = (tweet.username);
    	var $newTweet = $('<li></li>');
    	var $tweeter = $('<button></button>');
      var $tweeted = $('<span></span>');
        $tweeter.addClass('btn username');
        $tweeter.data('user', speaker);
        $tweeter.text(speaker);
        $newTweet.append($tweeter);
        $newTweet.append($tweeted);
        $tweeter.attr('href', '#');
        if(_.contains(friends, speaker)) { //Object.keys(friends) then could used indexOf
            console.log("contains is working");
            $tweeted.text(said);
            $tweeted.addClass('friend');
        } else {
          $tweeted.text(said);
        }
        $newTweet.appendTo($ul);
    },
    addRoom: function(text) {
      console.log('adding room');
      var $newRoomName = $('.newRoom').val();
      roomList[$newRoomName] = $newRoomName;
      var $newRoomOption = $('<option/>').val($newRoomName).text($newRoomName);
      $('select').append($newRoomOption);
      var roomMessages = _.filter(dataResults.results, function(val) {
    return val.roomname === $('select').val();
  });
  $('ul').empty();
  roomMessages.forEach(function(val) {
    app.addMessage(val);
  });
    },
};
//Personalizes the page and provides the input field


//fetches and loads the data from the server


//creates messages based on user input and sends to server
//?? how does this differ from addMessage?
//?? should init  call fetch?
$('.submitButton').on('click', function() {

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
$('#chats').on('click', '.roomCreate', app.addRoom);
$('.refreshButton').on('click', function() {
  var roomMessages = _.filter(dataResults.results, function(val) {
    return val.roomname === $('select').val();
  });
  $('ul').empty();
  roomMessages.forEach(function(val) {
    app.addMessage(val);
  });
});

$('#chats').on('click', '.btn username', function() {
  var friendName = $(this).data('user');
  friends[friendName] = friendName;
  console.log(friendName);
  app.clearMessages();
  app.fetch();
});


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

