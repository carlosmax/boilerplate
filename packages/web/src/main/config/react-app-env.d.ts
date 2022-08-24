// <reference types="react-scripts" />

interface Document {
  mozFullScreenElement: any
  webkitFullscreenElement: any
  cancelFullScreen: any
  mozCancelFullScreen: any
  webkitCancelFullScreen: any
  webkitIsFullScreen: any
  mozFullScreen: any
  msFullscreenElement: any
}

interface HTMLElement {
  mozRequestFullScreen: any
  webkitRequestFullscreen: any
}
