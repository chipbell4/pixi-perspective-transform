var PerspectiveTransform = require('./PerspectiveTransform');

// Create a pixi renderer
var renderer = PIXI.autoDetectRenderer(630, 410);
renderer.view.className = "rendererView";

// add render view to DOM
document.body.appendChild(renderer.view);

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0xFFFFFF);

var graphics = PIXI.Sprite.fromImage('map.png');
graphics.width = renderer.width * 0.75;
graphics.height = renderer.height * 0.75;
graphics.position.x = renderer.width * 0.125;
graphics.position.y = renderer.height * 0.125;

var perspective = new PerspectiveTransform({
  viewport_dimensions: [renderer.width, renderer.height],
  sprite_dimensions: [graphics.width, graphics.height],
  sprite_position: graphics.position,
});
graphics.filters = [perspective];
window.perspective = perspective;
stage.addChild(graphics);

requestAnimationFrame(animate);

function animate() {
  renderer.render(stage);
  requestAnimationFrame(animate);
}

// Allow the range to control values
var keys = ['bottom_scale', 'top_scale', 'scale_x_center'];
keys.forEach(function(key) {
  var range = document.getElementById(key);
  range.addEventListener('input', function() {
    perspective.uniforms[key].value = Number(range.value);
  });

  // initial value
  range.value = perspective.uniforms[key].value;
});
