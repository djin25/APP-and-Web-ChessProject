// ***** GLOBAL VARIABLES

let hasKingMoved = false;
const squareDark = 'rgb(10, 40, 10)';
const squareLight = 'rgb(240, 225, 200)';
var row;
var col;
var i=0;

// Inserting the Images
function insertImage() {
console.log('top of insertImage');
    document.querySelectorAll('.square').forEach(image => {

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
  const color = document.querySelectorAll('.square')

  color.forEach(color => {
      getId = color.id
      arr = Array.from(getId)
      arr.shift()
      aside = eval(arr.pop())
      aup = eval(arr.shift())
      a = aside + aup
      
      if (a % 2 == 0) {
          color.style.backgroundColor = squareDark;
      }
      if (a % 2 !== 0) {
          color.style.backgroundColor = squareLight;
      }

  })
}

//function to not remove the same team element

function reddish() {
  document.querySelectorAll('.square').forEach(i1 => {
      if (i1.style.backgroundColor == 'pink') {

          document.querySelectorAll('.square').forEach(i2 => {

              if (i2.style.backgroundColor == 'green' && i2.innerText.length !== 0) {


                  greenText = i2.innerText

                  pinkText = i1.innerText

                  pinkColor = ((Array.from(pinkText)).shift()).toString()
                  greenColor = ((Array.from(greenText)).shift()).toString()

                  getId = i2.id
                  arr = Array.from(getId)
                  arr.shift()
                  aside = eval(arr.pop())
                  aup = eval(arr.shift())
                  a = aside + aup
          
                  if (a % 2 == 0 && pinkColor == greenColor) {
                      i2.style.backgroundColor = 'rgb(240, 201, 150)'
                  }
                  if (a % 2 !== 0 && pinkColor == greenColor) {
                      i2.style.backgroundColor = 'rgb(100, 75, 43)'
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
insertImage(); // Display the pieces on the board.
coloring();
console.log('arr after coloring call: ', arr);
// EventLister for player click on piece. Show legal moves.
document.querySelectorAll('.square').forEach(item => {
    console.log('top of click eventlistener', tog);
    
    item.addEventListener('click', function () {
    console.log('in click handler', item);
      // To delete the opposite element
      if (item.style.backgroundColor == 'green' && item.innerText.length == 0) {
          tog = tog + 1
      }

      else if (item.style.backgroundColor == 'green' && item.innerText.length !== 0) {
          document.querySelectorAll('.square').forEach(i => {
              if (i.style.backgroundColor == 'pink') {
                  pinkId = i.id
                  pinkText = i.innerText

                  document.getElementById(pinkId).innerText = ''
                  item.innerText = pinkText
                  coloring()
                  insertImage()
                  tog = tog + 1
                  
              }
          })
      }

      getId = item.id
      arr = Array.from(getId)
      arr.shift()
      aside = eval(arr.pop())
      arr.push('0')
      aup = eval(arr.join(''))
      a = aside + aup

      console.log('arr is:', arr);

      // Function to display the available paths for all pieces
      function isThePosLegal(){
          
      }

      function whosTurn(toggle) {
        console.log('top of whosTurn');

          // PAWN
          if (item.innerText == `${toggle}pawn`) {
              item.style.backgroundColor = 'pink';
              if (tog % 2 !== 0 && aup < 800) {

                  if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
                      document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                  }

                  if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                      document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
                  }

                  if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                      document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'

                  }
                  if (document.getElementById(`b${a + 100}`).innerText.length == 0
                  &&document.getElementById(`b${a + 200}`).innerText.length == 0&&(document.getElementById(`b${a - 100}`).innerText.length >= 0
                  &&document.getElementById(`b${a + 600}`).innerText.length >= 0)){
                      document.getElementById(`b${a + 200}`).style.backgroundColor = 'green'
                  }
              }

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
                  &&document.getElementById(`b${a - 200}`).innerText.length == 0)&&(document.getElementById(`b${a + 100}`).innerText.length >= 0
                  &&document.getElementById(`b${a - 600}`).innerText.length >= 0)){
                      document.getElementById(`b${a - 200}`).style.backgroundColor = 'green'
                  }
              }


          }

          // KING
          // Add the ability to castle the king if hasKingMoved is false.
          if (item.innerText == `${toggle}king`) {


              if (aside < 8) {
                  document.getElementById(`b${a + 1}`).style.backgroundColor = 'green'

              }
              if (aside > 1) {

                  document.getElementById(`b${a - 1}`).style.backgroundColor = 'green'
              }
              if (aup < 800) {

                  document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
              }
              if (aup > 100) {

                  document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
              }

              if (aup > 100 && aside < 8) {

                  document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
              }
              if (aup > 100 && aside > 1) {

                  document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'
              }
              if (aup < 800 && aside < 8) {

                  document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
              }
              if (aup < 800 && aside > 1) {

                  document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'
              }

              item.style.backgroundColor = 'pink'

          }

          // ROOK
          if (item.innerText == `${toggle}rook`) {

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

              item.style.backgroundColor = 'pink'
          }

          // BISHOP
          if (item.innerText == `${toggle}bishop`) {


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



              item.style.backgroundColor = 'pink'

          }

          // QUEEN
          if (item.innerText == `${toggle}queen`) {


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



              item.style.backgroundColor = 'pink'

          }

          // KNIGHT
          if (item.innerText == `${toggle}knight`) {


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

              item.style.backgroundColor = 'pink'

          }
      }

      // Toggling the turn
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
      }

  });

});

// Moving the piece.
document.querySelectorAll('.square').forEach(hathiTest => {
console.log('top of moving the piece');
  hathiTest.addEventListener('click', function () {
    console.log('hathiTest.innerText is: ',hathiTest.innerText);
      if (hathiTest.style.backgroundColor == 'pink') {

          pinkId = hathiTest.id
          pinkText = hathiTest.innerText

          document.querySelectorAll('.square').forEach(hathiTest2 => {

              hathiTest2.addEventListener('click', function () {
                  if (hathiTest2.style.backgroundColor == 'green' && hathiTest2.innerText.length == 0) {
                      document.getElementById(pinkId).innerText = ''
                      hathiTest2.innerText = pinkText
                      // if the piece is the king then make haskingmoved true.
                      coloring()
                      insertImage()
                  }

              })
          })

      }

  })

});

// Prvents from selecting multiple elements
z = 0
document.querySelectorAll('.square').forEach(ee => {
  ee.addEventListener('click', function () {
      z = z + 1
      if (z % 2 == 0 && ee.style.backgroundColor !== 'green') {
          coloring()
      }
  })
});
function handleRestartGame() { //This is my own function. It is an attempt to get the game to restart when
    //the restart button is clicked. However, it is not complete yet.
    console.log('please work');
    document.querySelectorAll('.square').forEach(RestartIt => {
        RestartIt.innerHTML=RestartIt.getAttribute('permImg') // not retrieving attribute correctly
        RestartIt.style.cursor = 'pointer'
        tog
        console.log(RestartIt.getAttribute('permImg'));
        /*if(RestartIt.id==="b405"){
            RestartIt.innerHTML=""
        }
        if(RestartIt.id==="b205"){
            RestartIt.innerHTML="Wpawn"
        }*/
        
    })
    console.log('please work');
    insertImage();
    coloring();
    tog=1;
    document.getElementById('tog').innerText = "White's Turn"
    whosTurn('W')
}

document.querySelectorAll('.game--restart').forEach(restartButton => {
    restartButton.addEventListener('click', handleRestartGame);
});//Calls handleRestartGame
//if the restart game button is clicked

//function handleRestartGame() {
   // insertImage();
    //coloring();

//}