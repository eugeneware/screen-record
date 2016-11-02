/**
 * CommonJS module adaption from:
 *
 *   https://webrtcexperiment-webrtc.netdna-ssl.com/getScreenId.js
 *
 * @author Muaz Khan - www.MuazKhan.com
 * MIT License       - www.WebRTC-Experiment.com/licence
 * Documentation     - https://github.com/muaz-khan/getScreenId.
 *
 */

/**
 * Unique Frame ID to check if iframe has been installed already
 */
var IFRAME_ID = 'get_source_id_ajhifddimkapgcifgcodmmfdlknahffk';

/**
 * Get the Screen ID for a desktop or application screen sharing
 */
module.exports = getScreenId;
function getScreenId(_window, callback ) {
  if (typeof callback === 'undefined') {
    callback = _window;
    _window = window;
  }

  var iframe;

  // for Firefox:
  // sourceId == 'firefox'
  // screen_constraints = {...}
  if (!!navigator.mozGetUserMedia) {
    callback(null, 'firefox', {
      video: {
        mozMediaSource: 'window',
        mediaSource: 'window'
      }
    });
    return;
  }

  postMessage();

  _window.addEventListener('message', onIFrameCallback);

  function onIFrameCallback(event) {
    if (!event.data) return;

    if (event.data.chromeMediaSourceId) {
      if (event.data.chromeMediaSourceId === 'PermissionDeniedError') {
        callback('PermissionDeniedError');
      } else callback(null, event.data.chromeMediaSourceId,
          getScreenConstraints(null, event.data.chromeMediaSourceId));
    }

    if (event.data.chromeExtensionStatus) {
      callback(event.data.chromeExtensionStatus, null,
        getScreenConstraints(event.data.chromeExtensionStatus));
    }

    // this event listener is no more needed
    _window.removeEventListener('message', onIFrameCallback);
  }

  function getScreenConstraints(error, sourceId) {
    var screen_constraints = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: error ? 'screen' : 'desktop',
          maxWidth: _window.screen.width > 1920 ? _window.screen.width : 1920,
          maxHeight: _window.screen.height > 1080 ? _window.screen.height : 1080
        },
        optional: []
      }
    };

    if (sourceId) {
      screen_constraints.video.mandatory.chromeMediaSourceId = sourceId;
    }

    return screen_constraints;
  }

  function postMessage() {
    if (!iframe) {
      loadIFrame(postMessage);
      return;
    }

    if (!iframe.isLoaded) {
      setTimeout(postMessage, 100);
      return;
    }

    iframe.contentWindow.postMessage({
      captureSourceId: true
    }, '*');
  }

  function loadIFrame(loadCallback) {
    iframe = _window.document.getElementById(IFRAME_ID);
    if (iframe) {
      loadCallback();
      return;
    }

    iframe = _window.document.createElement('iframe');
    iframe.id = IFRAME_ID;
    iframe.onload = function() {
      iframe.isLoaded = true;

      loadCallback();
    };

    iframe.src = 'https://www.webrtc-experiment.com/getSourceId/';
    iframe.style.display = 'none';
    (_window.document.body || _window.document.documentElement).appendChild(iframe);
  }
}

