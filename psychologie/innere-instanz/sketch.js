// P_2_2_2_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * draw the path of an intelligent agent
 *
 * MOUSE
 * position x          : composition speed of the picture
 *
 * KEYS
 * DEL/BACKSPACE       : clear display
 * s                   : save png
 */
'use strict';

var NORTH = 0;
var EAST = 1;
var SOUTH = 2;
var WEST = 3;
var agents = [];

var stepSize = 3;
var minLength = 10;
var diameter = 1;
var angleCount = 7;

var startBild;
var vorlage;

function preload() {
  startBild = loadImage('img/mensch-umriss.png');
}

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');
  canvas.style('width', '100%');
  canvas.style('height', 'auto');
  canvas.style('display', 'block');
  colorMode(HSB, 360, 100, 100, 100);
  background(360);

  // Die Vorlage bleibt unverändert, während der Agent auf dem Canvas zeichnet.
  vorlage = createGraphics(width, height);
  vorlage.background(255);
  vorlage.image(startBild, 0, 0, width, height);
  image(vorlage, 0, 0);


  // Jede Linie besitzt ihre eigene Position, Richtung und letzten Eckpunkt.
  agents = [
    createAgent(width - 6, 6, SOUTH), // oben rechts
    createAgent(6, height - 6, NORTH) // unten links
  ];
}

function createAgent(x, y, direction) {
  return {
    posX: x,
    posY: y,
    posXcross: x,
    posYcross: y,
    direction: direction,
    angle: getRandomAngle(direction)
  };
}

function draw() {
  var speed = int(map(mouseX, 0, width, 0, 20));
  for (var i = 0; i <= speed; i++) {
    for (var agent of agents) {
      moveAgent(agent);
    }
  }
}

function moveAgent(agent) {
  strokeWeight(1);
  stroke(180, 0, 0);
  point(agent.posX, agent.posY);

  agent.posX += cos(radians(agent.angle)) * stepSize;
  agent.posY += sin(radians(agent.angle)) * stepSize;

  var reachedBorder = false;

  if (agent.posY <= 5) {
    agent.direction = SOUTH;
    reachedBorder = true;
  } else if (agent.posX >= width - 5) {
    agent.direction = WEST;
    reachedBorder = true;
  } else if (agent.posY >= height - 5) {
    agent.direction = NORTH;
    reachedBorder = true;
  } else if (agent.posX <= 5) {
    agent.direction = EAST;
    reachedBorder = true;
  }

  // Nur die Vorlage abfragen: Beide Linien bewegen sich unabhängig voneinander.
  var currentPixel = vorlage.get(floor(agent.posX), floor(agent.posY));
  var hitVorlage =
    currentPixel[0] < 240 ||
    currentPixel[1] < 240 ||
    currentPixel[2] < 240;

  if (reachedBorder || hitVorlage) {
    agent.angle = getRandomAngle(agent.direction);

    var distance = dist(agent.posX, agent.posY, agent.posXcross, agent.posYcross);
    if (distance >= minLength) {
      strokeWeight(3);
      stroke(0, 0, 0);
      line(agent.posX, agent.posY, agent.posXcross, agent.posYcross);
    }

    agent.posXcross = agent.posX;
    agent.posYcross = agent.posY;
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    background(360);
    image(vorlage, 0, 0);
  }
}

function getRandomAngle(currentDirection) {
  var a = (floor(random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;
  if (currentDirection == NORTH) return a - 90;
  if (currentDirection == EAST) return a;
  if (currentDirection == SOUTH) return a + 90;
  if (currentDirection == WEST) return a + 180;
  return 0;
}
