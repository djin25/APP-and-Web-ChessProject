// ***** GLOBAL VARIABLES

let hasKingMoved = false; /*This will be used to determine whether or not a king has moved (important for castling).
                            *Consider making this an attribute of the kings because there are two of them* */
const squareDark = 'rgb(10, 40, 10)'; //Sets the dark squares to a dark green color
const squareLight = 'rgb(240, 225, 200)'; //Sets the light squares to a white color
var targetId;
var row=1;
var col=1;
var rank=1;
var file="a";
var message="";
const firstEightLet=["x", "a", "b", "c", "d", "e", "f", "g", "h"]

// Inserting the Images
function insertImage() {
console.log('top of insertImage');
    document.querySelectorAll('.square').forEach(image => {//this line searches for all elements with
        //class 'square'
        //If the square's inner text is not empty, it looks at the type of piece and the color and
        //inserts the image accordingly
        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `${image.innerText} <img class='allimg allpawn' src="${image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'
            }

            else {

                image.innerHTML = `${image.innerText} <img class='allimg' src="${image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'
            }
        }
        }
    )
}

//Coloring
function coloring() {
console.log('top of coloring')    
  const color = document.querySelectorAll('.square') //This constant represents the set of all elements with class square

  color.forEach(color => { //for each square color (where color is the variable name for the squares)...
      getId = color.id //This is the unique square id (e.g. B101 for the A1 square)
      arr = Array.from(getId) //This transforms the getId string into an array
      arr.shift() //This turns the array ["B", "1", "0", "1"] (for example) into ["1", "0", "1"]
      aside = eval(arr.pop()) //the pop function removes the last element of the array: i.e. ["1", "0", "1"] becomes ["1", "0"]
      //And crucially also returns the last element. Eval evaluates the last element, so aside (aSIDE) has the value of "1" which represents the column (horizontal)
      aup = eval(arr.shift()) //shift removes the first element and returns it, and eval evaluates it, so aup (aUP) becomes the row (vertical)
      a = aside + aup //with aside and aup serving as the indices of the squares, a=the sum of the row and column indices, and because of the
      //checkered pattern of the chessboard, all squares where the sum is even are dark
      //and all squares where the sum is odd are even
      
      if (a % 2 == 0) {
          color.style.backgroundColor = squareDark;
      }
      if (a % 2 !== 0) {
          color.style.backgroundColor = squareLight;
      }

  })
}
function targetGeneration(){
    row=Math.floor((Math.random()*8)+1)
    col=Math.floor(Math.random()*8+1)
    console.log(row);
    console.log(col);
    rank=row
    file=firstEightLet[col]
    message=`${file}${rank}`
    console.log(file)
    console.log(rank)
    console.log(message)
    textOverlay = document.querySelector('.text-overlay');
    textOverlay.style.fontSize = '200px';
    textOverlay.textContent = message;
    /*document.querySelectorAll('.square').forEach(targMessage => {
        
        /*if(targMessage.id==="b504"){
            targMessage.innerHTML=message
            targMessage.style.fontSize = "100px";

            console.log('XXXXXX')
        }
    })*/
    target=row*100+col
    targetId=`b${target}`
    console.log(targetId)
}

//The Game Begins!

let timerId = 0; //Declares timerId outside so that later calls to the function are able to modify it

        // Get the timcer and grid elements from the DOM
function setTimer(){

    if(timerId != 0) {
        clearInterval(timerId);
    }
    const countdownDuration = 61;
    const timerEl = document.getElementById('timer');
    // Set the countdown duration (in seconds)

    // Set the start time (in milliseconds)
    let startTime = Date.now();

    // Update the timer every second
    timerId = setInterval(() => {
    // Get the current time (in milliseconds)
        const currentTime = Date.now();
        
        // Calculate the remaining time (in seconds)
        const remainingSeconds = Math.max(0, countdownDuration - Math.floor((currentTime - startTime) / 1000));
        
        // Update the timer display
        timerEl.textContent = `Remaining time: ${remainingSeconds} seconds`;
        
        // If the timer has reached 0, stop the timer and disable the grid
        if (remainingSeconds === 0) {
            clearInterval(timerId);
            /*document.querySelectorAll('.square').forEach(item => {
                item.style.pointerEvents = 'none';
            })*/
            document.querySelectorAll('.divv').forEach(item => {
                item.style.pointerEvents = 'none';
            })
        }
    }, 1000);
}

tog=0
insertImage(); // Calls function to display the pieces on the board.
coloring(); // Calls function to color the board
console.log('arr after coloring call: ', arr);
targetGeneration()
setTimer()
// EventLister for player click on piece. Show legal moves.
document.querySelectorAll('.square').forEach(item => {
    console.log('top of click eventlistener', tog);
    
    item.addEventListener('click', function () { //listens for clicks and calls function if clicked
        console.log('in click handler', item);
        // To delete the opposite element
        if (item.id===targetId){
            i=0
            if(item.style.backgroundColor===squareDark){
                i=1
            }
            item.style.backgroundColor='green'
            setTimeout(function(){
                if(i===0){
                    item.style.backgroundColor=squareLight
                }
                else{
                    item.style.backgroundColor=squareDark
                }
            }, 100);
            Score=document.querySelector('.Score');
            tog+=1;
            ScoreDisplay=`Score: ${tog}`
            Score.textContent = ScoreDisplay
            targetGeneration()
        }
            //End of runningGameState function

            // Toggling the turn. Displays whoses turn it is. Then, alls the whosTurn function (the long function that took up 90% of the preceeding code),
            //this time with the, opposite color, essentially putting us back in the position to look for and execute the next move
            /*if (tog % 2 !== 0) {
                document.getElementById('tog').innerText = "White's Turn"
                whosTurn('W')
            }

            if (tog % 2 == 0) {
                document.getElementById('tog').innerText = "Black's Turn"
                whosTurn('B')
            }*/
            
            /*
            numOfKings = 0

            document.querySelectorAll('.square').forEach(win => {
                if (win.innerText == 'Wking' || win.innerText == 'Bking') {
                    numOfKings += 1
                }

            })
            if (numOfKings == 1) {
                setTimeout(() => {
                    // console.log(`${toggle}`) 
                    if (tog % 2 == 0) {
                        alert('White Wins !!')
                        location.reload()
                    }
                    else if (tog % 2 !== 0) {
                        alert('Black Wins !!')
                        location.reload()
                    }
                }, 100)
            }*/

  });

});

function handleRestartGame() { //This is my own function. It is an attempt to get the game to restart when
    //the restart button is clicked. However, it is not complete yet.
    document.querySelectorAll('.divv').forEach(item => {
        item.style.pointerEvents = 'auto';
    })
    setTimer()
    tog=0
    ScoreDisplay=`Score: 0`
    Score.textContent = ScoreDisplay
    insertImage(); // Calls function to display the pieces on the board.
    coloring(); // Calls function to color the board
    console.log('arr after coloring call: ', arr);
    targetGeneration()
    // EventLister for player click on piece. Show legal moves.
    document.querySelectorAll('.square').forEach(item => {
        console.log('top of click eventlistener', tog);
        
        item.addEventListener('click', function () { //listens for clicks and calls function if clicked
            console.log('in click handler', item);
            // To delete the opposite element
            if (item.id===targetId){
                i=0
                if(item.style.backgroundColor===squareDark){
                    i=1
                }
                item.style.backgroundColor='green'
                setTimeout(function(){
                    if(i===0){
                        item.style.backgroundColor=squareLight
                    }
                    else{
                        item.style.backgroundColor=squareDark
                    }
                }, 100);
                Score=document.querySelector('.Score');
                tog+=1;
                ScoreDisplay=`Score: ${tog}`
                Score.textContent = ScoreDisplay
                targetGeneration()
            }
    });

    });
}

document.querySelectorAll('.game--restart').forEach(restartButton => {
    restartButton.addEventListener('click', handleRestartGame);
});


//Calls handleRestartGame
//if the restart game button is clicked