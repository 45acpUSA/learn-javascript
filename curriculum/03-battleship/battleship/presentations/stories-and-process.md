# Battleship Stories

## First Break it Down

Read all the stories.
Get the elements of the view and model that will be needed to complete the first epic. In other words, design it, but don't implement the whole thing at once. Create a piece at a time when you need it.
Take it one story at a time. It is easier to have many small wins than to have one big catastrophe.

One line of comment for one line of code.

Remember correct indentation.

Use the comment recipe for planning out functions.

Use the help protocol.

We will gather again on Friday for a code review.

## One more thing

1. Initialize git and after every story add, commit and push your code to github.

## First Epic

1. As a user I can see a 10 x 10 grid so that I can see the gameboard.<br><br>
  * Hint: Use a `for` loop to append to a table a `<tr>` tag, within that loop create another `for` loop to create the `<td>` tags. For a recap on loops look at Learn Day "Javascript Arrays and Iteration".
  * Hint: Each loop will count to 10.
  * Hint: Each `<td>` needs to have an id.<br><br>
1. As a user when I click on a position, the position changes color so that I can tell that a position has been torpedoed.<br><br>
  * Hint: document.getElementById("myDiv").className = "hit" to set the class of an element called "myDiv"
1. As a user I can see how many torpedoes I have used, so that I can keep track of how many I have used.
1. As a user once a position has been torpedoed, it cannot be torpedoed again so that I don't waste torpedoes.<br><br>
  * Hint: Use a conditional in your onclick function
1. As user I expect there to be 5 single length ships on the board.<br><br>
  * Hint: Create a global variable called board and have it hold an empty array. Have that empty array hold 10 empty arrays, creating a 2d array.
  * Hint: Create a global constant SHIP variable with a value of 1.
  * Hint: Create a loop that accesses the board at a random row and column and places a SHIP. <br><br>
1. As a user when I click on a position I can see if there was a ship at that location so that I can see if I hit a ship. If there is a ship it counts as a hit.<br><br>
  * Hint: Create a .onclick function to check the board for the presence of a SHIP.
    * If nothing is there it is a MISS.
    * If a SHIP is there, it will be a HIT.<br><br>
1. As a user I have won the game when I have 5 hits on the board, so that I know when the game is won and over.
1. As a user I have a limit of 25 torpedoes to hit all ships, and when I run out I have lost the game, so that that game is a challenge.
1. As a user if I lose, I can see where the ships were, so that I know there were actual ships on the board.<br><br>
  * Hint: Use a document.getElementById("myDiv").className to modify the existing sections.

## Second Epic

1. As a user I can see how many torpedoes I have left instead of how many I have used.
1. As a user I don't have ships that touch, so that there is always space between ships.<br><br>
  * Hint: Create a function that checks if a ship is present before placing a ship, so that two ships don't get placed in the same position.
  * Hint: Update the function to check around the ship that was placed, above, below, and sides.
  * Hint: Update the function work diagonally and from the corners of the board.<br><br>
1. As a user I can torpedo a 5 block ship, so that the game is diverse.<br><br>
  * Hint: Update your place ship's function to create a 5 block ship.<br><br>
1. As a user I can torpedo two 4 block ships, so that the game is diverse.
1. As a user I can torpedo two 3 block ships,, so that the game is diverse.
1. As a user I can torpedo two 2 block ships, so that the game is diverse.
1. As a user I can torpedo one 1 block submarine, so that the game is diverse.

## Third Epic
1. As a user the ships can be oriented vertical or horizontal but not diagonally, so that there is a diverse placement of ships on the board.<br><br>
  * Hint: Create a function that places a ship horizontally on the board.
  * Hint: Create a function that places a ship vertically on the board.<br><br>
1. As a user I can randomly place the two 4 block ships, one vertical one horizontal, so that there is a diverse placement of 4 block ships on the board.
1. As a user I can randomly place the 3 block ships, one vertical one horizontal, so that there is a diverse placement of 3 block ships on the board.
1. As a user I can randomly place the two 2 block ships, one vertical one horizontal, so that there is a diverse placement of 2 block ships on the board.
1. As a user I can see the status of ships I have sunk/not sunk, so that I have an easier way of knowing how many and which ships I left.

