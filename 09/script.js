//FOCUS THE USERNAME FIELD ON PAGE LOAD
//Comment this out if you want to edit as its really frustrating
$(document).ready(function(){
  //$('#username').focus();
});

//CATCH THE SUBMIT
$('#login').on('submit', function(e){
  e.preventDefault();
  e.stopPropagation();
  
  //CHECK THAT FIELDS ARE FILLED
  if ($("#username").val() != '' && $("#password").val() != '' ){
    
    //SUBMIT BUTTON ANIMATION HANDLING
    $('#submit').addClass('checking');
    $('#submit input').attr('disabled','true');
    
    //IMITATE LOADING TIME
    //This would be replaced with ajax in production.
    setTimeout(function(){
      $('#submit').removeClass('checking');
      clearPassword();
      handleMessage();
    }, 1000);
    
  } else{
    
    //SHAKE THE USERNAME AND PW FIELDS IF THEY ARE EMPTY ON SUBMIT
    if ($("#username").val() != ''){
      
      $("#password").addClass('shake');
      $("#password").focus();
      setTimeout(function(){
        $("#password").removeClass('shake');
      },440);
      
    } else {
      
      $("#username").addClass('shake');
      $("#username").focus();
      setTimeout(function(){
        $("#username").removeClass('shake');
      },440);
      
    }
  }
})

//HANDLE ANIMATION AND CLEARING OF INCORRECT PW
function clearPassword(){
  $("#password").addClass('shake');
  setTimeout(function(){
    $("#password").val('');
    $("#password").focus();
    $("#password").removeClass('shake');
    $('#submit input').removeAttr('disabled');
  },440);
}

//STORE USERNAMES AND ATTEMPTS REMAINING
//Purley for display purposes, this would be handled on the server with ajax in production.
var log = {};


//CHECK THE NUMBER OF ATTEMPTS REMANING AND SHOW APPROPRIATE MESSAGE
function handleMessage(){
  
  var username = $('#username').val();
  
  if(log[username] == undefined){
    log[username] = 3;
  }
  
  var attempts = log[username];
  
  switch(attempts){
    case 3:
      $('.remain').removeClass('hidden finished');
      $('.number').removeClass('two one');
      $('.lockout').addClass('hidden');
      log[username]--
    break;
    case 2:
      $('.remain').removeClass('hidden finished');
      $('.number').addClass('two');
      $('.number').removeClass('one');
      $('.lockout').addClass('hidden');
      log[username]--
    break;
    case 1:
      $('.remain').removeClass('hidden finished');
      $('.number').addClass('two one');
      $('.lockout').addClass('hidden');
      log[username]--
    break;
    case 0:
      $('.remain').removeClass('hidden');
      $('.remain').addClass('finished');
      $('.number').addClass('two one');
      $('.lockout').removeClass('hidden');
    break;
  }
}