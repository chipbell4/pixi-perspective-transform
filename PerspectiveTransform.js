/**
 * Applies a mode-7 style perspective transform, by pinching along the x-axis, based on the y coordinate. This makes it
 * skinnier at the top (or bottom), and wider at the bottom (or top), making the texture look like a trapezoid
 *
 * @param {float} options.bottom_scale The scale to use at the bottom
 * @param {float} options.top_scale The scale to use at the top
 * @param {float} options.scale_x_center The center from which to scale
 */
var PerspectiveTransform = function(options) {
  var fragmentShader = [
    'precision lowp float;',

    'uniform vec2 viewport_dimensions;',
    'uniform vec2 sprite_dimensions;',
    'uniform float bottom_scale;',
    'uniform float top_scale;',
    'uniform float scale_x_center;',

    'varying vec2 vTextureCoord;',
    'varying vec4 vColor;',
    'uniform sampler2D uSampler;',

    'vec2 pinch(vec2 coordinate) {',
    '  float centered_x = coordinate.x - scale_x_center;',
    '  float scale_factor = top_scale + (bottom_scale - top_scale) * coordinate.y;',
    '  return vec2(centered_x * scale_factor + scale_x_center, coordinate.y);',
    '}',

    'void main(void){',
    // convert from viewport to sprite coordinates
    '   vec2 localCoords = vTextureCoord * sprite_dimensions / viewport_dimensions;',

    // pinch
    '   vec2 pinched = pinch(localCoords);',

    // convert back to global
    '   vec2 globalCoords = pinched * viewport_dimensions / sprite_dimensions;',

    // Get color
    '   gl_FragColor = texture2D(uSampler, globalCoords) * vColor ;',
    '}'
  ].join('\n');

  options = options || {};
  options.bottom_scale = options.bottom_scale || 1.0;
  options.top_scale = options.top_scale || 1.0;
  options.scale_x_center = options.scale_x_center || 0.5;

  var uniforms = {
    bottom_scale: {
      type: 'f',
      value: options.bottom_scale
    },
    top_scale: {
      type: 'f',
      value: options.top_scale
    },
    scale_x_center: {
      type: 'f',
      value: options.scale_x_center
    },
    viewport_dimensions: {
      type: '2f',
      value: options.viewport_dimensions,
    },
    sprite_dimensions: {
      type: '2f',
      value: options.sprite_dimensions
    }
  };

  PIXI.AbstractFilter.call(
    this,
    null,
    fragmentShader,
    uniforms
  );
};

PerspectiveTransform.prototype = Object.create(PIXI.AbstractFilter.prototype);
PerspectiveTransform.prototype.constructor = PIXI.AbstractFilter;

module.exports = PerspectiveTransform;
