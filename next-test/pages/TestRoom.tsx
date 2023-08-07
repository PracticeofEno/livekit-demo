import '../app/globals.css';
import {
  LocalParticipant,
  LocalTrackPublication,
  Participant,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  Track,
  VideoPresets,
} from 'livekit-client';

const url = "ws://localhost:7880"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InRlc3QifSwiaWF0IjoxNjkxNDE5OTU4LCJuYmYiOjE2OTE0MTk5NTgsImV4cCI6MTY5MTQ0MTU1OCwiaXNzIjoiZGV2a2V5Iiwic3ViIjoidGVzdCIsImp0aSI6InRlc3QifQ.-VygAnWOW82FLEh1bAMGyRXt2lQ2Qz5eOxoYPdwgAEo"

let myVideo = "";
let myVideo2: LocalTrackPublication;
let videoStream;
// creates a new room with options
const room = new Room({
  // automatically manage subscribed video quality
  adaptiveStream: true,

  // optimize publishing bandwidth and CPU for published tracks
  dynacast: true,

  // default capture settings
  videoCaptureDefaults: {
    resolution: VideoPresets.h720.resolution,
  },
});

// pre-warm connection, this can be called as early as your page is loaded
room.prepareConnection(url, token);




async function connectRoom() {
  // connect to room
  await room.connect('ws://localhost:7880', token);
  console.log('connected to room', room.name);
  // publish local camera and mic tracks
  await room.localParticipant.enableCameraAndMicrophone();
  console.log(room.localParticipant.getTracks());
  myVideo = room.localParticipant.getTracks()[1].source;
  // set up event listeners
}

async function test() {
  room.localParticipant.videoTracks.forEach((data) => {
    myVideo2 = data;
    data.videoTrack?.attach(document.getElementById('test'))
    console.log(data)
  })
  // myVideo2 = room.localParticipant.videoTracks.get();
}


export default function TestRoom() {
  return (
      <div className="absolute flex flex-row w-full h-full bg-gray-300">
        <div className='flex flex-col w-[50%]'>
          <video id='test'/>
          <button className="bg-gray-500 h-10" onClick={connectRoom}>접속</button>
          <button className="bg-red-500 h-10"onClick={test}>버튼2 </button>
        </div>
        <div className='flex flex-col w-[50%]'>
          <video className='test2'>
          </video>
          <button>버튼1</button>
          <button>버튼2</button>
        </div>
      </div>
  )
}
  
