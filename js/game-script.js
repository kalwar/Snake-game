// Snake game on the web using queue DS
// - queue for snake body (array)
// - draw the grid with the snakes body
// - move - take in a direction, manipulate queues


function Snake() {
  // defing some styling colors for snake body and border
    const boardColor = 'black';
    const boardBg = "white";
    const snakeBodyColor = 'darkblue';

    // As using func. prog. approach so no need of constructor func.
    // snake body should be multi arry

    let snakebody = [
      {x: 200, y: 200},
      {x: 190, y: 200},
      {x: 180, y: 200},
      {x: 170, y: 200},
      {x: 160, y: 200}
    ]

    let changingDirection = false;
    // Horizontal velocity
    let dx = 10;
    // Vertical velocity
    let dy = 0;

    // Show game on canvas
    const snakeboard = document.getElementById("CanvasScreen");
    const snakeBoarder = snakeboard.getContext("2d");
    // Start game
    main();

    document.addEventListener("keydown", change_direction);

    // Calling this func. repeatedly to keep the game running
    function main() {
        if (has_game_ended()) return;
        changingDirection = false;
        setTimeout(function onTick() {
        clear_board();
        move_snake();
        drawSnake();
        // Call main again
        main();
      }, 100)
    }

    // draw a border around the canvas
    function clear_board() {

      snakeBoarder.fillStyle = boardBg;
      snakeBoarder.strokestyle = boardColor;
      snakeBoarder.fillRect(0, 0, snakeboard.width, snakeboard.height);
      snakeBoarder.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }

    // Draw the snake on the canvas
    function drawSnake() {
      // Draw each part
      snakebody.forEach(draw)
    }

    // Draw one part of snake body
    function draw(snakePart) {
      snakeBoarder.strokestyle = snakeBodyColor;

      snakeBoarder.fillRect(snakePart.x, snakePart.y, 10, 10);
      // Draw a border around the snake part
      snakeBoarder.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function has_game_ended() {
      for (let i = 4; i < snakebody.length; i++) {
        if (snakebody[i].x === snakebody[0].x && snakebody[i].y === snakebody[0].y) return true
      }
      const hitLeftWall = snakebody[0].x < 0;
      const hitRightWall = snakebody[0].x > snakeboard.width - 10;
      const hitToptWall = snakebody[0].y < 0;
      const hitBottomWall = snakebody[0].y > snakeboard.height - 10;
      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }

    // Defing BG grind


  // keypress func. not work like this, we need keycode to use keypress event

    function change_direction(event) {
      const LEFT_KEY = 65; //     if (keypress === 'a') this.move('left');
      const RIGHT_KEY = 68;   //     if (keypress === 'd') this.move('right');
      const UP_KEY = 87;  //     if (keypress === 'w') this.move('up');
      const DOWN_KEY = 83;   //     if (keypress === 's') this.move('down');

      if (changingDirection) return;
      changingDirection = true;
      const keypress = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keypress === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keypress === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keypress === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keypress === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    }

    function move_snake() {
      // Create the new Snake's head
      const head = {x: snakebody[0].x + dx, y: snakebody[0].y + dy};
      // Add the new head to the beginning of snake body
      snakebody.unshift(head);
      snakebody.pop();
    }
}
Snake();
