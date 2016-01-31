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

  PIXI.AbstractFilter.call(
    this,
    null,
    fragmentShader,
    {}
  );
};

PerspectiveTransform.prototype = Object.create(PIXI.AbstractFilter.prototype);
PerspectiveTransform.prototype.constructor = PIXI.AbstractFilter;

module.exports = PerspectiveTransform;
