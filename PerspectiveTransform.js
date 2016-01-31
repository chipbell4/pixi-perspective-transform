var PerspectiveTransform = function() {
  var fragmentShader = [
    'precision mediump float;',
    'varying vec2 vTextureCoord;',
    'uniform sampler2D uSampler;',

    'void main(void) {',
    '  gl_FragColor = texture2D(uSampler, vTextureCoord);',
    '  gl_FragColor.r = 1.0;',
    '}',

  ].join('\n');

  var uniforms = {
    x_focus: {
      type: '1f',
      value: 0.5
    },
    y_focus: {
      type: '1f',
      value: 0.5
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
