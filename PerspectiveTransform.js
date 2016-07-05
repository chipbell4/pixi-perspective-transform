/**
 * Applies a mode-7 style perspective transform, by pinching along the x-axis, based on the y coordinate. This makes it
 * skinnier at the top (or bottom), and wider at the bottom (or top), making the texture look like a trapezoid
 *
 * @param {float} options.bottom_scale The scale to use at the bottom
 * @param {float} options.top_scale The scale to use at the top
 * @param {float} options.scale_x_center The center from which to scale
 */
var PerspectiveTransform = function(options) {
  var vertexShader = [
    'precision lowp float;',
    'attribute vec2 aVertexPosition;',
    'attribute vec2 aTextureCoord;',
    'attribute vec4 aColor;',

    'uniform mat3 projectionMatrix;',
    'uniform float bottom_scale;',
    'uniform float top_scale;',
    'uniform float scale_x_center;',

    'varying vec2 vTextureCoord;',
    'varying vec4 vColor;',

    'vec2 pinch(vec2 coordinate) {',
    '  float centered_x = coordinate.x - scale_x_center;',
    '  float scale_factor = bottom_scale + (top_scale - bottom_scale) * coordinate.y;',
    '  return vec2(centered_x * scale_factor + scale_x_center, coordinate.y);',
    '}',

    'void main(void){',
    '   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
    '   vTextureCoord = pinch(aTextureCoord);',
    '   vColor = vec4(aColor.rgb * aColor.a, aColor.a);',
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
    }
  };

  PIXI.AbstractFilter.call(
    this,
    vertexShader,
    null,
    uniforms
  );
};

PerspectiveTransform.prototype = Object.create(PIXI.AbstractFilter.prototype);
PerspectiveTransform.prototype.constructor = PIXI.AbstractFilter;

module.exports = PerspectiveTransform;
