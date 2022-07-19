  let width = 320;
  let height = 0;

  let streaming = false;
  let photo = null;
  let canvas = null;

  function startup() {
    let video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    let snip_button = document.getElementById("snap");
    photo = document.getElementById("photo");
    let flip_button = document.getElementById("flip");

    //default user options
    let stream = null;
    let shouldFaceUser = true;
    let defaultsOpts = { video: true, audio: false };

    // Check if supports facingMode

    let supports = navigator.mediaDevices.getSupportedConstraints();
    if (supports["facingMode"] === true) {
      flip_button.disabled = false;
    }

    // Get streaming media video without audio

    let capture = function() {
      // Check which camera will choose, front or back
      defaultsOpts.video = {
        facingMode: shouldFaceUser ? "user" : "environment"
      };

      //Activate camera
      navigator.mediaDevices
        .getUserMedia(defaultsOpts)
        .then(_stream => {
          stream = _stream;
          video.srcObject = stream;
          video.play();
        })
        .catch(error => console.error(error));
    };

    // Listen video to start playing
    video.addEventListener("canplay", function(e) {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          //set width and height properties
          video.setAttribute("width", 1280);
          video.setAttribute("height", 320);
          canvas.setAttribute("width", 50);
          canvas.setAttribute("height", 50);
          streaming = true;
        }
      },
      false
    );
    
    //Snip Button

    snip_button.addEventListener("click",function(e) {
        takePicture();
        e.preventDefault();
      },
      false
    );
    
    // Flip Button

    flip_button.addEventListener("click", function() {
      if (stream == null) return;
      stream.getTracks().forEach(t => {
        t.stop();
      });
      shouldFaceUser = !shouldFaceUser;

      capture();
    });

    capture();
    clearPicture();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearPicture() {
    let context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  // Take Picture

  function takePicture() {
    let context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      let data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      clearPicture();
    }
  }

  //Run startup after loading
  window.addEventListener("load", startup, false);

navigator.devicePosture.addEventListener("change", () => {
    console.log(`The current posture is: ${navigator.devicePosture.type}!`);
    let posture = navigator.devicePosture.type;
    if(posture=='folded'){
      document.getElementById('camera-controls').style.backgroundColor = '#524abf';
      document.body.style.backgroundColor ='#524abf';
    }else{
      document.getElementById('camera-controls').style.backgroundColor = 'black';
      document.body.style.backgroundColor ='black';
    }
})   