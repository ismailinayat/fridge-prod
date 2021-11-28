





if (window.location.pathname === '/') {
  //console.log('yes home page')
  //console.clear();
const ctx = new AudioContext();
let audio;

fetch("./audio.wav")
  .then(data => data.arrayBuffer())
  .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
  .then(decodedAudio => {
    audio = decodedAudio;
  });

function playAudio() {
  const playSound = ctx.createBufferSource();
  playSound.buffer = audio;
  playSound.connect(ctx.destination);
  playSound.start(ctx.currentTime);
}

//window.addEventListener('mousedown', playAudio)
let session = false;
let border = 150;
let video = document.querySelector("#video");
//let audio = document.querySelector("#audio");

function init() {
    let initialized = false;
    if (initialized) return;
  
    initialized = true;
    updateWatching();
  }

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
        },
      });

      video.srcObject = stream;
      return new Promise((resolve) => {
        video.onloadedmetadata = () => resolve(video);
      });

      //video.play();

      //console.log(video.meta)
}
/*
async function getMetaData() {
    return await setupCamera()
}

console.log(getMetaData())
*/
/*
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
      video.srcObject = stream;
      video.play();
    })
  }*/

  const initDetection = async () => {
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet
    );
  
    let video;
  
    try {
      video = await setupCamera();
      video.play();
      detectPosesRealTime(detector);
    } catch (e) {
      throw e;
    }
  };

  const detectPosesRealTime = async (detector) => {
    let dcount = 0;
    let detected = false;
    var norec = 0;
    async function poseDetection() {
      const poses = await detector.estimatePoses(video);
      
      if (poses[0]) {
        const leftShoulder = poses[0].keypoints.find(
          (k) => k.name === "left_shoulder"
        );
        const rightShoulder = poses[0].keypoints.find(
          (k) => k.name === "right_shoulder"
        );
   
        if (poses[0]['score'] > 0.50 && !detected && !session && leftShoulder.y > border){
          detected = true;
          console.log("detected")
          countDetected = setInterval(function(){
            dcount++;
            console.log(dcount);
          },1000);
        }
        else if (poses[0]['score'] > 0.50 && detected && !session && leftShoulder.y < border){
          if (norec > 10){
            console.log("Lost him!!")
            clearInterval(countDetected);
            dcount = 0;
            detected = false;
          }
          norec ++;
        }
  
        if (dcount > 1){
          dcount = 0;
          clearInterval(countDetected);
  
          //This point means that user is recognized
          //Need to send request to frontend
  
          //console.log("Lets sell!!!!!!!!!!!!!!")
          //console.log(audio)
          //console.log(videoHome)
          //audio.play();

          playAudio();
          

          
         setTimeout(() => {
          window.location.replace('/home')
          }, 10000);

          
          session = true;
          detected = false;  
        }
      }
      else if (!poses[0] && detected){
        if (norec > 10){
          console.log("Lost him!!")
          clearInterval(countDetected);
          dcount = 0;
          detected = false;
        }
        norec ++;
      }
      requestAnimationFrame(poseDetection);
    }
    poseDetection();
  };
  initDetection();
}
