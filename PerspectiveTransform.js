var PerspectiveTransform = function(options) {
  options = options || {};
  options.x_focus = options.x_focus || 0.5;
  options.y_focus = options.y_focus || 0;
  options.x_scale = options.x_scale || 1;
  options.y_scale = options.y_scale || 1;
  options.view_width = options.view_width || 1;
  options.view_height = options.view_height || 1;
  options.graphics_width = options.graphics_width || 1;
  options.graphics_height = options.graphics_height || 1;

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

  var floatUniforms = ['x_focus', 'y_focus', 'x_scale', 'y_scale', 'view_width', 'view_height', 'graphics_width', 'graphics_height'];

  var uniforms = {};
  floatUniforms.forEach(function(uniformName) {
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
