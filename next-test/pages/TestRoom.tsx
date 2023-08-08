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
  TrackPublication,
  VideoPresets,
} from 'livekit-client';
import axios, { type AxiosResponse } from "axios";
import { get } from 'http';

const url = "ws://localhost:7880"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InRlc3QifSwiaWF0IjoxNjkxNDk4OTQ3LCJuYmYiOjE2OTE0OTg5NDcsImV4cCI6MTY5MTUyMDU0NywiaXNzIjoiZGV2a2V5Iiwic3ViIjoidGVzdDIiLCJqdGkiOiJ0ZXN0MiJ9.i0YLk_i8_ZTnosYqK2VgIaqZeSJno7u977z7Kulsa-A"
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
    }
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
    // set up event listeners
}

async function test() {
    
    // myVideo2 = room.localParticipant.videoTracks.get()
}

async function getRoomParitipants() {
    let participant = await axios.request(
        {
            method: 'GET',
            url: 'http://localhost:3001/room/test/participants',
        }
    )
    participant.data.forEach((participant: any) => {
        room.localParticipant.getTrack(Track.Source.Camera)?.trackSid
        let getParticipant : Participant | undefined = room.getParticipantByIdentity(participant.identity);
        if (getParticipant) {
            if (getParticipant instanceof LocalParticipant) {
                room.localParticipant.videoTracks.get(room.localParticipant.getTrack(Track.Source.Camera)?.trackSid as string)?.track?.attach(document.getElementById('test') as HTMLVideoElement);
            }
            else if (getParticipant instanceof RemoteParticipant) {
                getParticipant.tracks.forEach((track: RemoteTrackPublication) => {
                    if (track.mimeType?.includes('video')) {
                        console.log(`video`)
                        track.track?.attach(document.getElementById('test2') as HTMLVideoElement);
                    }
                })
                
            }
        }
        
    })
}

export default function TestRoom() {
    return (
      <div className="absolute flex flex-row w-full h-full bg-gray-300">
        <div className='flex flex-col w-[50%]'>
          <video id='test'/>
          <button className="bg-gray-500 h-10" onClick={connectRoom}>접속</button>
          <button className="bg-red-500 h-10"onClick={getRoomParitipants}>버튼2 </button>
        </div>
        <div className='flex flex-col w-[50%]'>
          <video id='test2'/>
          <button>버튼1</button>
          <button>버튼2</button>
        </div>
      </div>
      )
}
  
