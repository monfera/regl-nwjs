const createREGL = require('regl')
const fs = require('fs')

function render() {

  const canvas = document.getElementById('canvas')

  const width = 480
  const height = 480
  const pixelRatio = 1 // window.devicePixelRatio
  const canvasWidth = pixelRatio * width
  const canvasHeight = pixelRatio * height

  canvas.setAttribute('width', `${canvasWidth}`)
  canvas.setAttribute('height', `${canvasHeight}`)
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'

  const regl = createREGL({
    canvas: canvas,
    attributes: {
      preserveDrawingBuffer: true,
      antialias: true
    }
  });

  regl.clear({
    color: [1, 1, 1, 1],
    depth: 1
  });

  regl({

    attributes: {
      vertex: [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
      ]
    },
    elements: [
      [0, 2, 1],
      [1, 2, 3]
    ],
    vert: `
      precision mediump float;
      
      attribute vec2 vertex;
    
      void main() {
        gl_Position = vec4(vertex, 0, 1);
      }
    `,
    frag: `
      precision mediump float;
      
      float rnd(vec2 xy){
        return fract(sin(dot(xy, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main() {
        vec2 pc = gl_PointCoord;
        vec2 panelOrig = 0.4 * floor(pc / 0.4 + 0.5);
        vec2 coord = pc - 0.8 * panelOrig;
        float distance = 20.0 * length(coord);
        float r = 0.2 + 1.3 * rnd(panelOrig);
        gl_FragColor = vec4(
          pow(sin(r * r * distance), 2.0),
          pow(sin(r * r * r * distance), 2.0),
          pow(sin(r * distance), 2.0),
          1);
      }
    `
  })()

  fs.writeFile(
    'image.png',
    new Buffer(
      canvas
        .toDataURL('image/png')
        .replace(/^data:image\/\w+;base64,/, ""),
      'base64'
    )
  )
}