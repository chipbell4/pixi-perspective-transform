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
  var defaults = {
    x_scale: 1,
    c_x: 0,
    c_y: 0,
    f_radius: 1,
    f_theta: 0,
    sprite_width: 100,
    sprite_height: 100,
    viewport_width: 100,
    viewport_height: 100,
  };

  // Assign defaults for options
  options = options || {};
  Object.keys(defaults).forEach(function(key) {
    options[key] = options[key] || defaults[key];
  });

  var uniformsDeclaration = Object.keys(defaults).map(function(uniformName) {
    return 'uniform float ' + uniformName + ';';
  }).join('\n');

  var fragmentShader = [
    'precision mediump float;',
    'varying vec2 vTextureCoord;',
    'uniform sampler2D uSampler;',
    uniformsDeclaration,

    'void main(void) {',
    '  vec3 uv = vec3(vTextureCoord.xy, 1.0);',

    // some declarations
    '  vec2 c = vec2(c_x, c_y);',
    '  vec2 f = vec2(f_radius * cos(f_theta), f_radius * sin(f_theta));',

    // scale to be in unit square
    '  uv.x *= viewport_width / sprite_width;',
    '  uv.y *= viewport_height / sprite_height;',
    
    // translate to center
    '  uv.xy -= c;',

    '  uv.y *= -1.0;',

    // apply transformation to "undo" a perspective
    '  uv.x /= (1.0 - uv.y) * x_scale;',

    '  uv.y *= -1.0;',
    
    // scale by the distance from f to c
    '  uv.y *= f_radius;',

    // unrotate
    '  mat3 unrotate = mat3( vec3(cos(f_theta), -sin(f_theta), 0.0), vec3(sin(f_theta), cos(f_theta), 0.0), vec3(0.0, 0.0, 1.0));',
    '  uv = unrotate * uv;',

    // untranslate
    '  uv.xy += c;',

    // rescale back
    '  uv.x /= viewport_width / sprite_width;',
    '  uv.y /= viewport_height / sprite_height;',

    // Set the color
    '  gl_FragColor = texture2D(uSampler, uv.xy);',

    // Clamp to the texture, so we don't get "bleed"
    '  if(uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);',
    '}',

  ].join('\n');

  var uniforms = {};
  Object.keys(defaults).forEach(function(uniformName) {
    uniforms[uniformName] = {
      type: '1f',
      value: options[uniformName],
    };
  });

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
