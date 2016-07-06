# PIXI PerspectiveTransform Filter
Example usage:
```javascript
// assuming "renderer" and "stage" exist

var sprite = PIXI.Sprite.fromImage('checker.png');
// set sprite position, etc. here

var perspective = new PerspectiveTransform({
  // needed for some UV math. 
  viewport_dimensions: [renderer.width, renderer.height],
  sprite_dimensions: [sprite.width, sprite.height],

  // How much to scale the bottom part of the sprite
  bottom_scale: 1.0,

  // How much to scale the top part of the sprite
  top_scale: 0.5,

  // the x center coordinate of the transform. This part won't be stretched
  scale_x_center: 0.5,
});

sprite.filters = [perspective];

stage.addChild(sprite);
```
