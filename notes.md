# Transform _to_ perspective
* Translate to center of rotation c
* Rotate, so that f points up in y direction (although this is
  a left handed coordinate system)
* Scale y, so that the distance from c to f is now 1 (normalize)
* Perform a perspective transformation, so that points at y=1
  are scaled to exactly 0 and points at y=0 are scaled to
  exactly some x scale factor (this might be a parameter later?)
  `xP = S x * (1 - y)`
* Push everything back to the center of rotation

# Transform _from_ perspective
* Translate everything to the origin from the center of rotation/perspective
* Undo the perspective transformation, so that points at y=0 are
  scaled by the x scale factor, and that points at y=1 are
  scaled to (a clamped) infinity
  `x = xP / (1 - y) / S`
* Scale y by the distance from f to c
* Rotate, so that fc points in it's original direction (don't
  forget left handed!)
* Translate by c to "add back" the translation
