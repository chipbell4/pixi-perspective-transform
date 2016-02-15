/**
 * Maps a "perspective" transform to a sprite by taking a center point and focal point and pointing the focal point
 * "north" (the negative y direction). The center point is treated as (0.5, 0.5) and 
 */
var PerspectiveTransform = function(options) {
  var defaults = {
    x_scale: 1,
    c_x: 0,
    c_y: 0,
    f_x: 1,
    f_y: 1,
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
    '  vec2 f = vec2(f_x, f_y);',

    // scale to be in unit square
    '  uv.x *= viewport_width / sprite_width;',
    '  uv.y *= viewport_height / sprite_height;',
  
    // translate to center
    '  uv.xy -= c;',

    // apply transformation to "undo" a perspective
    '  uv.x /= (1.0 - uv.y) * x_scale;',

    // scale by the distance from f to c
    '  uv.y *= length(f - c);',

    // unrotate
    '  float pi = 3.14159;',
    '  float theta = pi / 2.0 - atan(f.y - c.y, f.x - c.x);',
    '  mat3 unrotate = mat3( vec3(cos(theta), sin(theta), 0.0), vec3(-sin(theta), cos(theta), 0.0), vec3(0.0, 0.0, 1.0));',
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
