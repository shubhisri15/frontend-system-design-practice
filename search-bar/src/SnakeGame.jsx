import { useState, useEffect, useRef } from "react";

const BOARD_SIZE = 20; // 20x20 grid
const INITIAL_SNAKE = [{ x: 8, y: 8 }];
const INITIAL_DIRECTION = { x: 1, y: 0 }; // moving right initially

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(randomFood());
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);

  const intervalRef = useRef(null);

  // Move the snake every 200ms
  useEffect(() => {
    intervalRef.current = setInterval(moveSnake, 200);
    return () => clearInterval(intervalRef.current);
  });

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 1) break; // prevent reversing
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === -1) break;
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 1) break;
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === -1) break;
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  function moveSnake() {
    if (gameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = { x: head.x + direction.x, y: head.y + direction.y };

      // Check collisions (walls)
      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= BOARD_SIZE ||
        newHead.y >= BOARD_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Check collisions (self)
      for (let segment of prevSnake) {
        if (segment.x === newHead.x && segment.y === newHead.y) {
          setGameOver(true);
          return prevSnake;
        }
      }

      let newSnake;
      if (newHead.x === food.x && newHead.y === food.y) {
        // Eat food: grow
        newSnake = [newHead, ...prevSnake];
        setFood(randomFood());
      } else {
        // Move: add new head, remove tail
        newSnake = [newHead, ...prevSnake.slice(0, -1)];
      }

      return newSnake;
    });
  }

  function randomFood() {
    return {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  }

  function resetGame() {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(randomFood());
    setGameOver(false);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>🐍 Snake Game</h2>
      {gameOver && (
        <div>
          <h3>Game Over!</h3>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${BOARD_SIZE}, 20px)`,
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
          margin: "20px auto",
          width: `${BOARD_SIZE * 20}px`,
          border: "2px solid black",
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
          const x = index % BOARD_SIZE;
          const y = Math.floor(index / BOARD_SIZE);
          const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={index}
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: isSnake ? "green" : isFood ? "red" : "white",
                border: "1px solid #eee",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SnakeGame;
