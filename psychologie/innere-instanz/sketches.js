import { zufallSketch } from './sketch.js';
import { gerichtetSketch } from './sketch-gerichtet.js';

new p5(zufallSketch, 'canvas-container');
new p5(gerichtetSketch, 'canvas-gerichtet');
