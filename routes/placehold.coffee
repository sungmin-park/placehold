require 'date-utils'
Canvas = require 'canvas'

module.exports = (req, res, next) ->
  width  = parseInt(if req.params.size then req.params.size else req.params.width)
  height = parseInt(if req.params.size then req.params.size else req.params.height)

  canvas = new Canvas width, height
  ctx = canvas.getContext "2d"

  # background
  ctx.save()
  ctx.fillStyle = if req.params.bgColor then "##{req.params.bgColor}" else "#aaa"
  ctx.fillRect 0, 0, width, height

  # size info
  ctx.font = "#{10}pt san-serif"
  ctx.fillStyle = if req.params.fgColor then "##{req.params.fgColor}" else "black"
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText "#{width} x #{height}", width / 2, height / 2
  ctx.restore()
  res.type '.png'
  res.header 'Cache-Control', 'public, max-age=604800'
  res.header 'Expires', Date.tomorrow()
  canvas.createPNGStream().pipe res
