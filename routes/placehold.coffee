Canvas = require('canvas')

module.exports = (req, res, next) ->
  [width, height] = [parseInt(req.params.width), parseInt(req.params.height)]
  canvas = new Canvas width, height
  ctx = canvas.getContext "2d"

  # Background
  ctx.fillStyle = "rgba(217, 217, 217, 1)"
  ctx.fillRect 0, 0, width, height

  # size info
  ctx.font = "#{10}pt san-serif"
  ctx.fillStyle = "black"
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText "#{width} x #{height}", width / 2, height / 2
  res.type('.png')
  canvas.createJPEGStream().pipe res
