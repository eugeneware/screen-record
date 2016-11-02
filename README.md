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

## API

### screenRecord([window], cb(err, sourceId, contraints))

Asks the Chome Extension to ask the user to authorize and pick a window or
the whole desktop to record.

* `window` - Optional DOM `window` object to use to do screen recording magic
  (`IFRAME` insertion, `postMessage` etc).
* `cb(err, sourceId, constraints)` - Callback:
    * `err` - Error
    * `sourceId` - The unique webrtc source ID string, that can be passed through
      a constraints object in `getUserMedia` to then create a webrtc stream.
    * `constraints` - Prefilled and ready-to-use `getUserMedia` constraints object
      that can be directly used. The `sourceId` is already correctly populated.

## Acknowledgements

This is a simple commonjs adaptation of the code originally created by
[@muaz-khan](https://github.com/muaz-khan) and is designed to work with this
[Chrome Extension](https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk)

The original code can be found [here](https://cdn.webrtc-experiment.com/getScreenId.js)

## License

As per the original license, this is licensed under the
[MIT License](http://www.WebRTC-Experiment.com/licence)
