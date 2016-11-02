# screen-record

Capture desktop video using webrtc

## Installation

This client-side module is installed via npm:

``` bash
$ npm install screen-record
```

It is a client-side browser that gives desktop recording capabilities to Chrome
when this [Chrome Extension](https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk) is installed.

## Example Usage

``` js
var screenRecord = require('screen-record'),
    getUserMedia = require('getusermedia');
screenRecord(window, (err, sourceId, constraints) => {
  if (err) throw err;

  getUserMedia(constraints, function (err, stream) {
    if (err) throw err;

    // now have a webRTC stream of the desktop
  })
});
```

## Acknowledgements

This is a simple commonjs adaptation of the code originally created by
[@muaz-khan](https://github.com/muaz-khan) and is designed to work with this
[Chrome Extension](https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk)

The original code can be found [here](https://cdn.webrtc-experiment.com/getScreenId.js)

## License

As per the original license, this is licensed under the
[MIT License](http://www.WebRTC-Experiment.com/licence)
