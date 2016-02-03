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

  options = options || {};
  Object.keys(defaults).forEach(function(key) {
    options[key] = options[key] || defaults[key];
  });

  var fragmentShader = [
    'precision mediump float;',
    'varying vec2 vTextureCoord;',
    'uniform sampler2D uSampler;',
    'uniform float x_focus;',
    'uniform float y_focus;',
    'uniform float x_scale;',
    'uniform float y_scale;',
    'uniform float view_width;',
    'uniform float view_height;',
    'uniform float graphics_width;',
    'uniform float graphics_height;',

    'void main(void) {',
    '  vec2 uv = vTextureCoord.xy;',
    '  uv.x = (uv.x - x_focus) / (uv.y - y_focus) / x_scale + x_focus;',
    '  gl_FragColor = texture2D(uSampler, uv);',
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
