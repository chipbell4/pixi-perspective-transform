# PIXI PerspectiveTransform Filter
A PIXI filter for emulating [Mode-7 style perspective transforms](https://en.wikipedia.org/wiki/Mode_7) on sprites, ala
F-Zero, Mario Kart, Link to the Past, among others.

## Usage
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

## Building
If you want to build it yourself
```
npm install
npm start
```
Then, go check out the `index.html` file in your browser (via a webserver and not `file://`). You should see everything
in action.
