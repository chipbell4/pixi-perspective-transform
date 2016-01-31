var PerspectiveTransform = function() {
  var fragmentShader = [
    'precision mediump float;',
    'varying vec2 vTextureCoord;',
    'uniform sampler2D uSampler;',
    'uniform float x_focus;',
    'uniform float y_focus;',

    'void main(void) {',
    '  vec2 uv = vTextureCoord.xy;',
    '  uv.x = (uv.x - x_focus) / (uv.y - y_focus) + x_focus;',
    '  gl_FragColor = texture2D(uSampler, uv);',
    '}',

  ].join('\n');

  var uniforms = {
    x_focus: {
      type: '1f',
      value: 0.5
    },
    y_focus: {
      type: '1f',
      value: 1
    },
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
