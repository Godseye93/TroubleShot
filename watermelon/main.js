import { Bodies, Body, Engine, Events, Render, Runner, World } from "matter-js";
import { FRUITS_BASE } from "./fruits";

let THEME = "base"; // { base, syhyun }
let FRUITS = FRUITS_BASE;
let score = 0;
let highScores = [];

switch (THEME) {
  case "syhyun":
    FRUITS = FRUITS_syhyun;
    break;
  default:
    FRUITS = FRUITS_BASE;
}

FRUITS = FRUITS_BASE;

const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: false,
    background: "#F7F4C8",
    width: 620,
    height: 850,
  }
});

const world = engine.world;

const leftWall = Bodies.rectangle(15, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: "#E6B143" }
});

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: "#E6B143" }
});

const ground = Bodies.rectangle(310, 820, 620, 60, {
  isStatic: true,
  render: { fillStyle: "#E6B143" }
});

const topLine = Bodies.rectangle(310, 150, 620, 2, {
  name: "topLine",
  isStatic: true,
  isSensor: true,
  render: { fillStyle: "#E6B143" }
})

World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(engine);

let currentBody = null;
let currentFruit = null;
let disableAction = false;
let interval = null;

if (localStorage.getItem('highScores')) {
  highScores = JSON.parse(localStorage.getItem('highScores'));
}

function addFruit() {
  const index = Math.floor(Math.random() * 5);
  const fruit = FRUITS[index];

  const body = Bodies.circle(300, 50, fruit.radius, {
    index: index,
    isSleeping: true,
    render: {
      sprite: {
        texture: `${fruit.name}.png`,
        xScale: 1.25,
        yScale: 1.25
      },
    },
    restitution: 1,
  });

  currentBody = body;
  currentFruit = fruit;

  World.add(world, body);
}

function updateHighScores() {
  const highScoreList = document.getElementById('highScoreList');
  highScoreList.innerHTML = '';

  highScores.forEach((score, index) => {
    const li = document.createElement('li');
    li.textContent = `#${index + 1} 등: ${score.score} - ${score.name}`;
    highScoreList.appendChild(li);
  });
}

function resetGame() {
  World.clear(world, true);

  World.add(world, [leftWall, rightWall, ground, topLine]);

  addFruit();

  disableAction = false;
  score = 0;
  document.getElementById('score').innerText = `Score: ${score}`;
}

window.onkeydown = (event) => {
  if (disableAction) {
    return;
  }

  switch (event.code) {
    case "KeyA":
      if (interval)
        return;

      interval = setInterval(() => {
        if (currentBody.position.x - currentFruit.radius > 30)
          Body.setPosition(currentBody, {
            x: currentBody.position.x - 3,
            y: currentBody.position.y,
          });
      }, 5);
      break;

    case "KeyD":
      if (interval)
        return;

      interval = setInterval(() => {
        if (currentBody.position.x + currentFruit.radius < 590)
        Body.setPosition(currentBody, {
          x: currentBody.position.x + 3,
          y: currentBody.position.y,
        });
      }, 5);
      break;

    case "KeyS":
      currentBody.isSleeping = false;
      disableAction = true;

      setTimeout(() => {
        addFruit();
        disableAction = false;
      }, 300);
      break;
  }
}

window.onkeyup = (event) => {
  switch (event.code) {
    case "KeyA":
    case "KeyD":
      clearInterval(interval);
      interval = null;
  }
}

Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    if (collision.bodyA.index === collision.bodyB.index) {
      const index = collision.bodyA.index;

      if (index === FRUITS.length - 1) {
        return;
      }

      World.remove(world, [collision.bodyA, collision.bodyB]);

      const newFruit = FRUITS[index + 1];

      const newBody = Bodies.circle(
        collision.collision.supports[0].x,
        collision.collision.supports[0].y,
        newFruit.radius,
        {
          render: {
            sprite: {
              texture: `${newFruit.name}.png`,
              xScale: 1.25,
              yScale: 1.25
            },
          },
          index: index + 1,
        }
      );

      World.add(world, newBody);

      score += FRUITS[index].score;
      document.getElementById('score').innerText = `Score: ${score}`;
    }


    if (
      !disableAction &&
      (collision.bodyA.name === "topLine" || collision.bodyB.name === "topLine")) {
      alert("Game over");

      if (highScores.length < 3 || score > highScores[2].score) {
        const name = prompt("축하합니다! 상위 3등 안에 들었습니다. 소감을 입력해주세요.");
        highScores.push({ name: name, score: score });

        highScores.sort(function(a, b) { return b.score - a.score; });

        highScores = highScores.slice(0, 3);

        localStorage.setItem('highScores', JSON.stringify(highScores));

        updateHighScores()
      }

      resetGame()
    }
  });
});


window.onload = function() {
  if (localStorage.getItem('highScores')) {
    highScores = JSON.parse(localStorage.getItem('highScores'));
  } else {
    highScores = [];
  }

  updateHighScores();
  addFruit();

  // setInterval(() => {
  //   localStorage.clear();
  // }, 600000);
  // localStorage.clear(); -> 초기화명령어
};