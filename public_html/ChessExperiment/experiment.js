// ***** GLOBAL VARIABLES

var hasWKingMoved = false; /*This will be used to determine whether or not the white king has moved (important for castling).*/
var hasLWRookMoved = false; /*Has the left white rook moved*/
var hasRWRookMoved = false; /*Has the right white rook moved*/
var hasBKingMoved = false; /*This will be used to determine whether or not the black king has moved (important for castling).*/
var hasLBRookMoved = false; /*Has the left black rook moved*/
var hasRBRookMoved = false; /*Has the right black rook moved*/

const squareDark = 'rgb(10, 40, 10)'; //Sets the dark squares to a dark green color
const squareLight = 'rgb(240, 225, 200)'; //Sets the light squares to a white color
var row; //As of yet, these variables are not used. [insert purpose in comments if you do use them]
var col; //As of yet, these variables are not used. [insert purpose in comments if you do use them]
var i=0; //As of yet, these variables are not used. [insert purpose in comments if you do use them]

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

//function to not remove the same team element

function reddish() {//colors as indicators of available squares
  document.querySelectorAll('.square').forEach(i1 => {//for each square i1...
      if (i1.style.backgroundColor == 'pink') {//checks the square color. This will become relevant later on when the function to handle clicked squares is implemented.
        //Essentially, this line just searches all the squares for the one that was clicked.

          document.querySelectorAll('.square').forEach(i2 => {//iterates again through all the squares, this time with variable i2. Having found the clicked square,
            //this function now just goes through all the squares again and tries to find the ones that can be moved to, which are denoted by the green color

              if (i2.style.backgroundColor == 'green' && i2.innerText.length !== 0) {//If the potential square to move to is green and the square is not empty...


                  greenText = i2.innerText //greenText is a new variable and is set to the innerText (piece and color) for i2

                  pinkText = i1.innerText //pinkText is a new variable and is set to the innerText (piece and color) for i1

                  pinkColor = ((Array.from(pinkText)).shift()).toString() //creates an array from the clickedsquare's innerText, deletes and
                  //returns the starting element, and then converts the starting element to a string. The starting letter of the innerText
                  //represents the color, so this line returns the color of the clicked piece denoted by a "W" or "B"
                  greenColor = ((Array.from(greenText)).shift()).toString() //Same thing as above, except this is for the green squares or the
                  //squares that the piece is potentially going to move to

                  //This section should seem familiar because it was used in the coloring function
                  getId = i2.id //variable getId is set to the id (which once again is the string that denotes the location) of i2
                  arr = Array.from(getId) //getId is converted to an array and stored in arr
                  arr.shift() //the first element is removed (the "b" at the start)
                  aside = eval(arr.pop()) //this denotes the column
                  aup = eval(arr.shift()) //this denotes the row
                  a = aside + aup //once again, a represents the sum of the column and row indices
          
                  //these lines color the checkered pattern
                  if (a % 2 == 0 && pinkColor == greenColor) {
                      i2.style.backgroundColor = squareDark
                  }
                  if (a % 2 !== 0 && pinkColor == greenColor) {
                      i2.style.backgroundColor = squareLight
                  }

                  // if (pinkColor == greenColor) {
                  //     i2.style.backgroundColor = 'rgb(253, 60, 60)'
                  // }
              }
          })
      }
  })
}

// ***** ON PAGE LOAD

// START NEW GAME.
tog = 1
insertImage(); // Calls function to display the pieces on the board.
coloring(); // Calls function to color the board
console.log('arr after coloring call: ', arr);
// EventLister for player click on piece. Show legal moves.
document.querySelectorAll('.square').forEach(item => {
    console.log('top of click eventlistener', tog);
    
    item.addEventListener('click', function () { //listens for clicks and calls function if clicked
    console.log('in click handler', item);
      // To delete the opposite element
      if (item.style.backgroundColor == 'green' && item.innerText.length == 0) { // If the square clicked can be moved to (green) and is empty...
          tog = tog + 1 //increments the move numbers by 1
      }

      else if (item.style.backgroundColor == 'green' && item.innerText.length !== 0) { // If the the square clicked is green but not empty (capture)
          
          document.querySelectorAll('.square').forEach(i => {
              if (i.style.backgroundColor == 'pink') { //Rapidly looks for the new clicked square and sets the innertext of the destination square
                //to the innertext of the moved piece while setting the innertext of the starting square to 0.
                  pinkId = i.id
                  pinkText = i.innerText

                  document.getElementById(pinkId).innerText = ''
                  item.innerText = pinkText
                  coloring()
                  insertImage()
                  tog = tog + 1 //increments the move number by 1
                  
              }
          })
      }
      //aside=column number, aup=row number, a=sum of the two
      getId = item.id
      arr = Array.from(getId)
      arr.shift()
      aside = eval(arr.pop())
      arr.push('0')
      aup = eval(arr.join(''))
      a = aside + aup
      console.log('The value of aside is:' + aside);
      console.log('The value of aup is:' + aup);
      console.log('The value of a is:' + a);

      console.log('arr is:', arr);

      function whosTurn(toggle) {
        console.log('top of whosTurn');

          // PAWN---Checks for the possible squares for specific pieces and sets them to green
          if (item.innerText == `${toggle}pawn`) {//toggle is "W" or "B" depending on the move. So if the piece is a pawn whose color
            //matches the color whose move it is currently is...
              item.style.backgroundColor = 'pink'; //sets the pawn's square to pink, effectively marking it as the piece to be moved
              if (tog % 2 !== 0 && aup < 800) { //if tog is odd (white to move) and the white pawn's row is below the 8th (top) row

                  if (document.getElementById(`b${a + 100}`).innerText.length == 0) { //the +100 in the id represents the id of the square 1 square after the current one
                      document.getElementById(`b${a + 100}`).style.backgroundColor = 'green' //sets the square to green if it is empty
                  }

                  //The next to if statements look for the squares directly to the left or right diagonally of the current one, for potential captures
                  if (aside < 8 && document.getElementById(`b${a + 101}`).innerText.length !== 0) {
                      document.getElementById(`b${a + 101}`).style.backgroundColor = 'green'
                  }

                  if (aside > 1 && document.getElementById(`b${a + 99}`).innerText.length !== 0) {
                      document.getElementById(`b${a + 99}`).style.backgroundColor = 'green'

                  }

                  //This checks for whether the pawn can move 2 squares: is it still on its starting square (checks for whether the square 6 ahead exists)
                  //and are the two squares in front both empty
                  if (document.getElementById(`b${a + 100}`).innerText.length == 0
                  &&document.getElementById(`b${a + 200}`).innerText.length == 0&&document.getElementById(`b${a + 600}`).innerText.length >= 0){
                      document.getElementById(`b${a + 200}`).style.backgroundColor = 'green'
                  }
              }
              //Same as the section above, but for black pawns
              if (tog % 2 == 0 && aup > 100) {

                  if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
                      document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                  }
                  if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                      document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
                  }
                  if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                      document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'

                  }
                  if ((document.getElementById(`b${a - 100}`).innerText.length == 0
                  &&document.getElementById(`b${a - 200}`).innerText.length == 0)&&document.getElementById(`b${a - 600}`).innerText.length >= 0){
                      document.getElementById(`b${a - 200}`).style.backgroundColor = 'green'
                  }
              }


          }

          // KING
          // Add the ability to castle the king if hasKingMoved is false.
          if (item.innerText == `${toggle}king`) {//if the piece moved is a king


              if (aside < 8) { //checks if the king can move to the right
                  document.getElementById(`b${a + 1}`).style.backgroundColor = 'green'

              }
              if (aside > 1) { //checks if the king can move to the left

                  document.getElementById(`b${a - 1}`).style.backgroundColor = 'green'
              }
              if (aup < 800) { //checks if the king can move up

                  document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
              }
              if (aup > 100) { //checks if the king can move down

                  document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
              }

              if (aup > 100 && aside < 8) { //checks if the king can move down and to the right

                  document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
              }
              if (aup > 100 && aside > 1) { //checks if the king can move down and to the left

                  document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'
              }
              if (aup < 800 && aside < 8) { //checks if the king can move up and to the right

                  document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
              }
              if (aup < 800 && aside > 1) { //checks if the king can move up and to the left

                  document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'
              }

              if (tog%2==1&&!hasWKingMoved){
                  console.log('checkpoint1')
                  if(!hasLWRookMoved){
                    console.log('checkpoint2')
                    document.getElementById(`b${a - 2}`).style.backgroundColor = 'green'
                  }
                  if(!hasRWRookMoved){
                    console.log('checkpoint3')
                    document.getElementById(`b${a + 2}`).style.backgroundColor = 'green'
                  }
              }
              if (tog%2==0&&!hasBKingMoved){
                console.log('checkpoint1b')
                if(!hasLBRookMoved){
                  console.log('checkpoint2b')
                  document.getElementById(`b${a - 2}`).style.backgroundColor = 'green'
                }
                if(!hasRBRookMoved){
                  console.log('checkpoint3b')
                  document.getElementById(`b${a + 2}`).style.backgroundColor = 'green'
                }
              }

              item.style.backgroundColor = 'pink' //sets the king's square to pink, effectively marking it as the piece to be moved

          }

          // ROOK
          if (item.innerText == `${toggle}rook`) { //if the piece clicked is a rook

              for (let i = 1; i < 9; i++) { //i loops through the values from 1 to 8. Then it uses if statements to check for a
                //a number of conditions: if a+i*100 is less than 900 AND the element with Id a+i*100 is an empty square. As a
                //reminder, a is the sum of the row*100 + the column, and is therefore a 3 digit number with a 0 in the middle.
                //Meanwhile, the value of i*100 increments by 100 every time. Since the hundreds digit in an id represents the
                //number of rows from the bottom, the i*100 part serves to increase the square upwards by 1 every time. 
                //Therefore, by checking if a+i*100 is less than 900, the code determines whether or not the Id a+i*100 represents
                //a square on the board that is not too high, and then sets that square's background to green if it is empty
                //The else if statement checks if the square is a valid square but is not empty, and if that is the case, it 
                //sets the square's background to green, but it also breaks since the subsquent squares are blocked
                  if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                      document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                      console.log('the value of a is:' + a+i*100);
                  }
                  else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                      document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                      break
                  }
              }

              for (let i = 1; i < 9; i++) { //This for loop does the same thing as the previous one, except it checks
                //Whether or not the rook can move down to certain squares.That's why there are - signs instead of + signs

                  if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                      document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                  }
                  else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                      document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                      break
                  }
              }

              for (let i = 1; i < 9; i++) { //This for loop checks moves to the right. The lack of the *100 means that we
                //are working on the horizontal scale, and the + indicates that we are checking moves to the right

                  if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                      document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                  }
                  else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                      document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                      break
                  }
              }

              for (let i = 1; i < 9; i++) { //Similar to the preceeding look, this loop checks squares to the left.
 
                  if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                      document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                  }
                  else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                      document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                      break
                  }
              }

              item.style.backgroundColor = 'pink' //Indicates that the rook is the piece to be moved
          }

          // BISHOP
          if (item.innerText == `${toggle}bishop`) {//If the piece moved is a bishop


              for (let i = 1; i < 9; i++) {//This for loop uses a similar technique as the rook moves. It has a
                //variable i which increments from 1 to 8, and uses the i < (900 - aup) / 100 condition to check
                //if the move is too high and the i < 9 - aside condition to check if the move is too far too the
                //right. If the move is valid, and the square is empty, the background color is set to green. The
                //else if condition breaks upon encountering the first valid but nonempty square.
                  if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                      document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                  }
                  else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                      document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                      break
                  }
              }


              for (let i = 1; i < 9; i++) {//Checks for diagonally down and to the right moves
                  if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                      document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                  }
                  else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                      document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                      break
                  }
              }


              for (let i = 1; i < 9; i++) {//Checks for diagonally up and to the left moves
                  if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                      document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                  }
                  else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                      document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                      break
                  }

              }


              for (let i = 1; i < 9; i++) {//Checks for diagonally down and to the left moves
                  if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                      document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                  }
                  else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                      document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                      break
                  }
              }



              item.style.backgroundColor = 'pink' //Marks the bishop as the piece to be moved

          }

          // QUEEN
          if (item.innerText == `${toggle}queen`) {//This one essentially combines the rook and bishop for loops
            //to check for all possible horizontal, vertical, and diagonal moves. There are 8 for loops, each of which check 1 of the
            //8 possible directions.


              for (let i = 1; i < 9; i++) {

                  if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                      document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                  }
                  else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                      document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                      break
                  }
              }

              for (let i = 1; i < 9; i++) {

                  if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                      document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                  }
                  else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                      document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                      break
                  }
              }

              for (let i = 1; i < 9; i++) {

                  if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                      document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                  }
                  else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                      document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                      break
                  }
              }

              for (let i = 1; i < 9; i++) {

                  if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                      document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                  }
                  else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                      document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                      break
                  }
              }



              for (let i = 1; i < 9; i++) {
                  if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                      document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                  }
                  else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                      document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                      break
                  }
              }


              for (let i = 1; i < 9; i++) {
                  if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                      document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                  }
                  else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                      document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                      break
                  }
              }


              for (let i = 1; i < 9; i++) {
                  if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                      document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                  }
                  else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                      document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                      break
                  }

              }


              for (let i = 1; i < 9; i++) {
                  if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                      document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                  }
                  else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                      document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                      break
                  }
              }



              item.style.backgroundColor = 'pink' //Marks the queen as the piece to be moved

          }

          // KNIGHT
          if (item.innerText == `${toggle}knight`) {//If the piece is a knight

            //Each of the following checks one of the 8 possible knight moves and whether or
            //not they fit within the confines of the board. If they do, they are marked green.
              if (aside < 7 && aup < 800) {
                  document.getElementById(`b${a + 100 + 2}`).style.backgroundColor = 'green'
              }
              if (aside < 7 && aup > 200) {
                  document.getElementById(`b${a - 100 + 2}`).style.backgroundColor = 'green'
              }
              if (aside < 8 && aup < 700) {
                  document.getElementById(`b${a + 200 + 1}`).style.backgroundColor = 'green'
              }
              if (aside > 1 && aup < 700) {
                  document.getElementById(`b${a + 200 - 1}`).style.backgroundColor = 'green'
              }
              if (aside > 2 && aup < 800) {
                  document.getElementById(`b${a - 2 + 100}`).style.backgroundColor = 'green'
              }
              if (aside > 2 && aup > 100) {
                  document.getElementById(`b${a - 2 - 100}`).style.backgroundColor = 'green'
              }
              if (aside < 8 && aup > 200) {
                  document.getElementById(`b${a - 200 + 1}`).style.backgroundColor = 'green'
              }
              if (aside > 1 && aup > 200) {
                  document.getElementById(`b${a - 200 - 1}`).style.backgroundColor = 'green'
              }

              item.style.backgroundColor = 'pink' //Marks the knight as the piece to be moved.

          }
      }//End of whosTurn function

      // Toggling the turn. Displays whoses turn it is. Then, alls the whosTurn function (the long function that took up 90% of the preceeding code),
      //this time with the, opposite color, essentially putting us back in the position to look for and execute the next move
      if (tog % 2 !== 0) {
          document.getElementById('tog').innerText = "White's Turn"
          whosTurn('W')
      }

      if (tog % 2 == 0) {
          document.getElementById('tog').innerText = "Black's Turn"
          whosTurn('B')
      }

      reddish()
      // winning()

      numOfKings = 0

      document.querySelectorAll('.square').forEach(win => {
          if (win.innerText == 'Wking' || win.innerText == 'Bking') {
              numOfKings += 1
          }

      })//The code above counts the number of kings on the board. Provided that neither king is captured,
      //there should be 2 kings

      if (numOfKings == 1) {//If there is one king, it means that someone's king was captured. This code
        //sets an alert, announcing the side that won depending on whose king was captured
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
      }

  });

});

// Moving the piece.
document.querySelectorAll('.square').forEach(hathiTest => {
console.log('top of moving the piece');
  hathiTest.addEventListener('click', function () {
    console.log('hathiTest.innerText is: ',hathiTest.innerText);
    console.log(hathiTest.innerHTML)
      if (hathiTest.style.backgroundColor == 'pink') {
          pinkId = hathiTest.id
          pinkText = hathiTest.innerText
          
          document.querySelectorAll('.square').forEach(hathiTest2 => {

              hathiTest2.addEventListener('click', function () {
                  if (hathiTest2.style.backgroundColor == 'green' && hathiTest2.innerText.length == 0) {
                      document.getElementById(pinkId).innerText = ''
                      hathiTest2.innerText = pinkText
                      //*change* if the piece is the king then make haskingmoved true.
                      console.log('checkpoint0')
                      console.log(hathiTest2.innerHTML)
                      console.log(pinkId)
                      /*The following 2 if statements check to see if the move that is made is a castling move.
                      Specifically, it checks to see if 1) the piece moved is a king and 2) if the square that
                      the king is moved to is 2 horizontal squares away from the king's current square. If so,
                      the code inside the if statement moves the rook into its proper place to complete the
                      castle*/
                      if(pinkText == 'Wking'){
                        if(hathiTest2.id=='b107'){
                            document.getElementById('b108').innerText = ''
                            document.getElementById('b106').innerText = 'Wrook'
                        }
                        if(hathiTest2.id=='b103'){
                            document.getElementById('b101').innerText = ''
                            document.getElementById('b104').innerText = 'Wrook'
                        }
                      }
                      if(pinkText == 'Bking'){
                        if(hathiTest2.id=='b807'){
                            document.getElementById('b808').innerText = ''
                            document.getElementById('b806').innerText = 'Brook'
                        }
                        if(hathiTest2.id=='b803'){
                            document.getElementById('b801').innerText = ''
                            document.getElementById('b804').innerText = 'Brook'
                        }
                      }/*End of the king castle test*/
                      if (hathiTest2.innerText=='Wking'&&!hasWKingMoved){
                        console.log('checkpointWK')
                        hasWKingMoved=true
                      }
                      if (hathiTest2.innerText=='Bking'&&!hasBKingMoved){
                        console.log('checkpointBK')
                        hasBKingMoved=true
                      }
                      if ((hathiTest2.innerText=='Wrook'&&pinkId=='b101')&&!hasLWRookMoved){
                        console.log('checkpointWRL')
                        hasLWRookMoved=true
                      }
                      if ((hathiTest2.innerText=='Wrook'&&pinkId=='b108')&&!hasRWRookMoved){
                        console.log('checkpointWRR')
                        hasRWRookMoved=true
                      }
                      if ((hathiTest2.innerText=='Brook'&&pinkId=='b801')&&!hasLBRookMoved){
                        console.log('checkpointBRL')
                        hasLBRookMoved=true
                      }
                      if ((hathiTest2.innerText=='Brook'&&pinkId=='b808')&&!hasRBRookMoved){
                        console.log('checkpointBRR')
                        hasRBRookMoved=true
                      }
                    /*The preceeding 6 if statements test to see if the white or black kings/rooks have moved, which is important when it comes to castling*/
                      coloring()
                      insertImage()
                  }
                  //This code looks for the click, and if the clicked square us green, makes the move, swaps the data for the squares
                  //and does the coloring and image insertion

              })
          })

      }

  })

});

// Prevents from selecting multiple elements
z = 0
document.querySelectorAll('.square').forEach(ee => {
  ee.addEventListener('click', function () {
      z = z + 1
      if (z % 2 == 0 && ee.style.backgroundColor !== 'green') {
          coloring() //If the square clicked isn't green, the colors reset
          //(essentially allowing the player to choose a new piece to move)
      }
  })
});

//function handleRestartGame() {
   // insertImage();
    //coloring();

//}
