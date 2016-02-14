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
graphics.width = graphics.height = 200;
var perspective = new PerspectiveTransform({
    x_scale: 1.0,
    c_x: 0.5,
    c_y: 0.5,
    f_x: 0.5,
    f_y: -0.2
  })
graphics.filters = [perspective];
stage.addChild(graphics);

requestAnimationFrame(animate);

function animate() {
  renderer.render(stage);
  requestAnimationFrame(animate);
}

// Allow the range to control values
var range = document.getElementById('range');
var span = document.getElementById('range-value');
range.addEventListener('input', function() {
  var key = 'c_x';
  perspective.uniforms[key].value = Number(range.value);
  span.innerHTML = key + ' = ' + range.value;
});
