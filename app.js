var PerspectiveTransform = require('./PerspectiveTransform');

var viewWidth = 630;
var viewHeight = 410;

// Create a pixi renderer
var renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight);
renderer.view.className = "rendererView";

// add render view to DOM
document.body.appendChild(renderer.view);

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0xFFFFFF);

var graphics = PIXI.Sprite.fromImage('checker.png');
graphics.anchor.x = graphics.anchor.y = 0.5;
graphics.position.x = viewWidth / 2;
graphics.position.y = viewHeight / 2;
graphics.width = graphics.height = 300;
graphics.filters = [
  new PerspectiveTransform({
    x_scale: 1,
    y_scale: 1,
    x_focus: 0,
    y_focus: 0,
  })
];
stage.addChild(graphics);

requestAnimationFrame(animate);

function animate() {
  //graphics.rotation += 0.01;
  renderer.render(stage);
  requestAnimationFrame(animate);
}
