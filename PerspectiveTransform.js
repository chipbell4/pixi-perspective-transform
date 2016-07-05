/**
 * Maps a "perspective" transform to a sprite by taking a center point and focal point and pointing the focal point
 * north, treating the center point as the origin. The focal point is also treated as the "center of perspective",
 * so that points on the image "collapse" to that very point. We also apply an "x scale" perpendicular to the
 * perspective access. Lastly, the size of the sprite and viewport are needed to fix scaling issues associated with
 * PIXI's inner texture coordinate representation, which is relative to the viewport and not the sprite. In my case,
 * I'm expecting the points to be in the "sprite unit square" ranging from (0,0) to (1,1), pointing within the size of
 * the sprite
 *
 * @param {float} options.x_scale The x scale factor to use
 * @param {float} options.c_x The x position of the center vector
 * @param {float} options.c_y The y position of the center vector
 * @param {float} options.f_radius The distance f is from c
 * @param {float} options.f_theta The angle between f and c
 * @param {float} options.sprite_width The width of the sprite
 * @param {float} options.sprite_height The height of the sprite
 * @param {float} options.viewport_width The width of the viewport
 * @param {float} options.viewport_height The height of the viewport
 */
var PerspectiveTransform = function(options) {
  var vertexShader = [
    'precision lowp float;',
    'attribute vec2 aVertexPosition;',
    'attribute vec2 aTextureCoord;',
    'attribute vec4 aColor;',

    'uniform mat3 projectionMatrix;',

    'varying vec2 vTextureCoord;',
    'varying vec4 vColor;',

    'vec2 pinch(vec2 coordinate) {',
    // TODO: Make uniforms
    '  float bottom_scale = 1.0;',
    '  float top_scale = 1.0;',
    '  float scale_x_center = 0.5;',
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

  PIXI.AbstractFilter.call(
    this,
    vertexShader,
    null,
    {}
  );
};

PerspectiveTransform.prototype = Object.create(PIXI.AbstractFilter.prototype);
PerspectiveTransform.prototype.constructor = PIXI.AbstractFilter;

module.exports = PerspectiveTransform;
