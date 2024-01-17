var initialized = false
var initListeners = []

var stdin = ''
var inBuffer = []
var outBuffer = []
var errBuffer = []

function toByteArray(str) {
  var byteArray = []
  var encodedStr = unescape(encodeURIComponent(str))
  for (var i = 0; i < encodedStr.length; i++) {
    byteArray.push(encodedStr.charCodeAt(i))
  }
  return byteArray
}

function fromByteArray(data) {
  var array = new Uint8Array(data)
  var str = ''
  for (var i = 0; i < array.length; ++i) {
    str += String.fromCharCode(array[i])
  }
  return decodeURIComponent(escape(str))
}

// note about emscripten:
// even though the module is now named "jq", pre.js still uses Module and post.js uses "jq"
Module = Object.assign({
  noInitialRun: true,
  noExitRuntime: true,
  onRuntimeInitialized: function() {
    initialized = true
    initListeners.forEach(function(cb) {
      cb()
    })
  },
  preRun: function() {
    FS.init(
      function input() {
        if (inBuffer.length) {
          return inBuffer.pop()
        }

        if (!stdin) return null
        inBuffer = toByteArray(stdin)
        stdin = ''
        inBuffer.push(null)
        inBuffer.reverse()
        return inBuffer.pop()
      },
      function output(c) {
        if (c) {
          outBuffer.push(c)
        }
      },
      function error(c) {
        if (c) {
          errBuffer.push(c)
        }
      }
    )
  }
}, Module)
