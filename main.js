var poemQ = "this is a poem / it is not a good poem / i am sorry"
var poemW = "blah blah / blah blah blah / blah blah"
var poemE = "blah blah / blah blah blah / blah blah"
var poemR = "blah blah / blah blah blah / blah blah"
var poemT = "blah blah / blah blah blah / blah blah"
var poemY = "blah blah / blah blah blah / blah blah"
var poemU = "blah blah / blah blah blah / blah blah"
var poemI = "blah blah / blah blah blah / blah blah"
var poemO = "blah blah / blah blah blah / blah blah"
var poemP = "blah blah / blah blah blah / blah blah"
Mousetrap.bind("q", function(){
    showPoem(poemQ, 80)
})
Mousetrap.bind("w", function(){
    showPoem(poemW, 80)
})
Mousetrap.bind("e", function(){
    showPoem(poemE, 80)
})
Mousetrap.bind("r", function(){
    showPoem(poemR, 80)
})
Mousetrap.bind("t", function(){
    showPoem(poemT, 80)
})
Mousetrap.bind("y", function(){
    showPoem(poemY, 80)
})
Mousetrap.bind("u", function(){
    showPoem(poemU, 80)
})
Mousetrap.bind("i", function(){
    showPoem(poemI, 80)
})
Mousetrap.bind("o", function(){
    showPoem(poemO, 80)
})
Mousetrap.bind("p", function(){
    showPoem(poemP, 80)
})
Mousetrap.bind("enter", function(){
    twinkleOut(100);
})
Mousetrap.bind("shift+enter", function(){
    twinkleOut(400);
})
Mousetrap.bind("ctrl+shift+enter", function(){
    $('#textDiv').empty();
})

Mousetrap.bind('1', function(){
    $('html').css('font-family', 'Lato');
})
Mousetrap.bind('2', function(){
    $('html').css('font-family', 'Oxygen');
})
Mousetrap.bind('3', function(){
    $('html').css('font-family', 'Goodfoot');
})
Mousetrap.bind('4', function(){
    $('html').css('font-family', 'Century Gothic');
})
Mousetrap.bind('5', function(){
    $('html').css('font-family', 'Gill Sans');
})
Mousetrap.bind('6', function(){
    $('html').css('font-family', 'Georgia');
})
Mousetrap.bind('7', function(){
    $('html').css('font-family', 'Baskerville');
})
Mousetrap.bind('8', function(){
    $('html').css('font-family', 'Trebuchet MS');
})
Mousetrap.bind('9', function(){
    $('html').css('font-family', 'Futura');
})
Mousetrap.bind('0', function(){
    $('html').css('font-family', 'Arial Black');
})
Mousetrap.bind("-", function(){
    var fs = parseInt($('html').css("font-size")) -5;
    $('html').css('font-size', fs);
})

Mousetrap.bind("=", function(){
    var fs = parseInt($('html').css("font-size")) +5;
    $('html').css('font-size', fs);
})


//some useful functions, we'll talk about these later
oddLine = true;

//multiple lines
function showText (text){
    $('#textDiv').append("<h1>"+text+"</h1>");
    //scrolls to the bottom
    $('#bottom')[0].scrollIntoView(false);

}

//single line
function showText2 (text){
    if($('#mainText').length == 0){
        $('#textDiv').append("<h1 id='mainText'>"+text+"</h1>");
    }
    else {
        $('#mainText').text(text);
    }
}

function showPoem(poem, speed){
    oddLine = true;
    var poemArray = poem.split(" / ");
    var index = 0;
    var p = setInterval(function(){
        if(index >= poemArray.length){
            clearInterval(p);
            $('#textDiv').append('<br>')
        } else{
        twinkleIn(poemArray[index], speed)
        index++;
        }
    }, speed * poemArray[index].length)
}

function twinkleIn(string, speed) {
    var c = 0;
    if(oddLine == true){
        $('#textDiv').append('<h1></h1>');
        oddLine = false;
    } else {
        $('#textDiv').append('<h1 class="indent"></h1>');
        oddLine = true
    }
    var dest = $('h1:last')[0]; 
    var i = setInterval(function () { //basically a while loop with a delay between each iteration
        if (c >= string.length) {
            // $(dest).html(string);
            clearInterval(i);
        } else {
            $('<span>').text(string[c]).
            appendTo(dest).hide().fadeIn(400);
            c += 1;
            if(c == 1){$('#bottom')[0].scrollIntoView(false);}
        }
    }, speed); //this is the delay in milliseconds between each character, increase to slow down, decrease to speed up
};

function twinkleOut(speed) {
    var array = $('#textDiv span');
            var ii = setInterval(function() {  
                if(array.length == 0){
                    clearInterval(ii);
                    setTimeout(function(){$('#textDiv').empty()}, 1000)
                } else {
                    rand = Math.floor(Math.random()*array.length)
                    array.eq(rand).animate({opacity: 0}, 1000);
                    array.splice(rand, 1);
                }
            }, speed);
};
//all sounds at once

function setBgImage(fileName){
    $("html").css('background-image', 'url(images/'+fileName+')'); 
}
function setBgColor(color){
    $("html").css('background-color', color); 
    //image overrides color so we need to clear any background images
    $('html').css('background-image', "")
}
function setTextColor(color){
    $('html').css('color', color)
}

//in-browser editor
var editorVisible = false;
$(document).ready(function() {
    $('#butttn').click(function () {
    toggleEditorDiv();
})
   $.ajax({
   url : "main.js",
   dataType: "text",
   success : function (data) {
       $("#editor_js").text(data);
          }
})
})

Mousetrap.bindGlobal('shift+space', function () {
    toggleEditorDiv();
})

function toggleEditorDiv () {
    if(editorVisible == false){
        $('#editorDiv').fadeIn();
        editorVisible = true;
    }
    else {
        var val = $('#editor_js').val();
        eval(val);
        $('#editorDiv').fadeOut();
        editorVisible = false;
    }

}