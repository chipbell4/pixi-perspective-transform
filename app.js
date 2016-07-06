var PerspectiveTransform = require('./PerspectiveTransform');

// Create a pixi renderer
var renderer = PIXI.autoDetectRenderer(630, 410);
renderer.view.className = "rendererView";

// add render view to DOM
document.body.appendChild(renderer.view);

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0xFFFFFF);

// create the sprite
var sprite = PIXI.Sprite.fromImage('checker.png');
sprite.width = renderer.width * 0.5;
sprite.height = renderer.height * 0.5;
sprite.position.x = renderer.width * 0.125;
sprite.position.y = renderer.height * 0.125;
stage.addChild(sprite);

// add the filter
var perspective = new PerspectiveTransform({
  viewport_dimensions: [renderer.width, renderer.height],
  sprite_dimensions: [sprite.width, sprite.height],
});
sprite.filters = [perspective];

// expose some globals for testing
window.sprite = sprite;
window.perspective = perspective;

// start the animation loop
function animate() {
  renderer.render(stage);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// hook up the range elements to the uniforms on the shader
var keys = ['bottom_scale', 'top_scale', 'scale_x_center'];
keys.forEach(function(key) {
  var range = document.getElementById(key);
  range.addEventListener('input', function() {
    perspective.uniforms[key].value = Number(range.value);
  });

  // initial value
  range.value = perspective.uniforms[key].value;
});
