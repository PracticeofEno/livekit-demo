import DropDownList from '@/components/DropDownList'
import '../app/globals.css'
import LocalParticipantView from '@/components/LocalParticipant'
import RemoteParticipantView from '@/components/RemoteParticipant'
import {
  Room,
  Track,
  VideoPresets,
  createLocalAudioTrack,
  createLocalTracks,
  createLocalVideoTrack,
} from 'livekit-client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function GuestLive() {
  const [localVideo, setlocalVideo] = useState<Track>()
  const [localAudio, setlocalAudio] = useState<Track>()
  const [room, setRoom] = useState<Room>()
  const path = useRouter().asPath
  useEffect(() => {
    async function publishlocalTrack() {
      // ? 이후의 문자열을 가져와서 &로 나눔
      const queryStr = path.split('?')[1];
      const queryParams = queryStr.split('&');
      const queryObject : any = {};
      queryParams.forEach(param => {
        const [key, value] = param.split('=');
        queryObject[key] = value;
      });
      console.log(queryObject)
      const room = new Room({
        // automatically manage subscribed video quality
        adaptiveStream: true,
        // optimize publishing bandwidth and CPU for published tracks
        dynacast: true,
        // default capture settings
        videoCaptureDefaults: {
          resolution: VideoPresets.h720.resolution,
        },
      })
      setRoom(room)
      if (queryObject.access) {
        await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL as string, queryObject.access)
        await room.localParticipant.enableCameraAndMicrophone()
      }        
      else {
        console.log("failed to  access room")
        // router.push('/')
      }
      const haha = await createLocalTracks()
      haha.forEach((track: Track) => {
        if (track.kind == Track.Kind.Video) 
          track.attach(document.getElementById('my-video') as HTMLVideoElement)
        else
          track.attach(document.getElementById('my-audio') as HTMLVideoElement)
      })
      
    }
    publishlocalTrack()
    
  }, [])

  const changeVideo = async (eventData) => {
    let tmp = await Room.getLocalDevices()
    let device_data: MediaDeviceInfo = null;

    for (const device of tmp) {
      if (device.label == eventData) {
        device_data = device;
        break;
      }
      createLocalVideoTrack({
        deviceId: device.deviceId,
      })
        .then((track: Track) => {
          track.attach(
            document.getElementById('my-video') as HTMLVideoElement,
          )
          setlocalVideo(track)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (device_data)
      await room?.switchActiveDevice('videoinput', device_data.deviceId)
    console.log(eventData)
  }

  const changeAudio = async (eventData) => {
    let tmp = await Room.getLocalDevices()
    console.log(tmp)
    tmp.forEach((device) => {
      if (device.label == eventData) {
        createLocalAudioTrack({
          deviceId: device.deviceId,
        })
          .then((track: Track) => {
            track.attach(
              document.getElementById('my-audio') as HTMLVideoElement,
            )
            setlocalAudio(track)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    console.log(eventData)
  }
  return (
    <div className="absolute flex flex-col w-full h-full bg-gray-400 justify-center items-center">
      <div className='relative flex flex-row w-full h-[65%] bg-red-400 justify-center items-center'>
        <video id='my-video' className='relative w-[80%] h-[80%]'></video>
        <audio id='my-audio'></audio>
      </div>
      <div className='relative flex flex-row w-full h-[35%] bg-blue-400'>
        <DropDownList label={'video'} changeEvent={changeVideo} />
        <DropDownList label={'audio'} changeEvent={changeAudio} />
      </div>
    </div>
  )
}
