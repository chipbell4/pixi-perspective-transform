/**
 * Maps a "perspective" transform to a sprite by taking a center point and focal point and pointing the focal point
 * "north" (the negative y direction). The center point is treated as (0.5, 0.5) and 
 */
var PerspectiveTransform = function(options) {
  var defaults = {
    x_focus: 0.5,
    y_focus: 0,
    x_scale: 1,
    y_scale: 1,
    view_width: 1,
    view_height: 1,
    graphics_width: 1,
    graphics_height: 1,
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
    // apply transformation to "undo" a perspective
    
    // unscale
    '  mat3 unscale = mat3(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0));',
    '  uv = unscale * uv;',
   
    // "unperspective"
    //'  uv.x = uv.x / (1.0 - uv.y);',

    // unrotate
    '  float theta = 3.14159 / 4.0;',
    '  mat3 unrotate = mat3( vec3(cos(theta), sin(theta), 0.0), vec3(-sin(theta), cos(theta), 0.0), vec3(0.0, 0.0, 1.0));',
    '  uv = unrotate * uv;',

    // untranslate
    '  uv.x +=  0.3;',
    '  uv.y += -0.2;',

    '  gl_FragColor = texture2D(uSampler, uv.xy);',
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
