![alt text](https://cdn.glitch.com/13771a9f-c66b-4a73-87e9-b9fe0f4bb542%2Fsamsunginternet-logo.png?v=1629113116392 "Samsung Internet Logo")

# The folding webcam

A webcam that detects the folded posture and change its layout accordingly to improve user's experience.

## Getting started

This is a webcam created by Samsung Internet to showcase the device posture API on a Samsung Galaxy Flip using WebRTC. 
You can follow the step by step codelab to recreate this yourself with the starter kit: 
https://github.com/SamsungInternet/webcam-fold-starterkit

More information here [Device Posture API](https://www.w3.org/TR/device-posture/#dfn-posture)


### Prerequisites

- Basic knowledge of HTML5, CSS and Javascript
- Samsung Internet Web Browser
- For testing: A foldable device / [Samsung Remote Test Lab Account](https://developer.samsung.com/remote-test-lab) / [Device Posture API Polyfill](https://github.com/w3c/device-posture/tree/gh-pages/polyfill)

![alt text](https://cdn.glitch.com/13771a9f-c66b-4a73-87e9-b9fe0f4bb542%2Fzip.jpg?v=1629114185887 "Samsung Galaxy Flip")

### Javascript implementation

Besides the css media query, an implementation of detecting the posture using javascript has been added.
It uses the navigator.devicePosture interface and the onchange attribute to handle posture changes.

```javascript

// Detecting each time the device change its posture

navigator.devicePosture.addEventListener("change", () => {
    console.log(`The current posture is: ${navigator.devicePosture.type}!`);
    
    //Saving the current posture
    let posture = navigator.devicePosture.type;
    if(posture=='folded'){
       // change the layout or do something else if it's folded
    }else{
      // if it returns to unfolded change the layout or do something else...
    }
})   
```