import DropDownList from '@/components/DropDownList'
import '../app/globals.css'
import {
  Room,
  Track,
  VideoPresets,
  createLocalAudioTrack,
  createLocalTracks,
  createLocalVideoTrack,
} from 'livekit-client'
import { useEffect, useState } from 'react'
import { deleteRoom, egressToRtmp, getGuestLiveToken, getStreamKey } from '@/api/room'
import { useRouter } from 'next/router'

export default function GuestLive() {
  const [room, setRoom] = useState<Room>()
  const [roomKey, setStreamKey] = useState<string>()
  const [localVideo, setlocalVideo] = useState<Track>()
  const [localAudio, setlocalAudio] = useState<Track>()
  const router = useRouter();
  
  useEffect(() => {
    async function initialize() {
      const streamKey = await getStreamKey()
      setStreamKey(streamKey);
      const at = await getGuestLiveToken(streamKey);
      console.log(`room name: ${streamKey}`)
      console.log(`accessToken: ${at}`)
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
      let localTracks: Track[] = []
      try {
        localTracks = await createLocalTracks()
      }
      catch(e) {
        alert('카메라 및 마이크를 허용해주세요.')
        router.push('/');
      }
      for (const track of localTracks) {
        if (track.kind == Track.Kind.Video) {
          track.attach(document.getElementById('my-video') as HTMLVideoElement)
          setlocalVideo(track)
        }
        else {
          track.attach(document.getElementById('my-audio') as HTMLVideoElement)
          setlocalAudio(track)
        }
      }
      await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL as string, at)
      await room.localParticipant.enableCameraAndMicrophone()
      console.log(streamKey);
      await egressToRtmp(streamKey)
    }
    initialize();
    return async () => {
      if (roomKey)
        deleteRoom(roomKey);
    }
  }, [])

  const changeVideo = async (eventData) => {
    let tmp = await Room.getLocalDevices()
    let device_data: any = null;

    for (const device of tmp) {
      if (device.label == eventData) {
        device_data = device;
        break;
      }
    }
    if (device_data) {
      await room?.switchActiveDevice('videoinput', device_data.deviceId)
      createLocalVideoTrack({
        deviceId: device_data.deviceId,
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
    console.log(eventData)
  }

  const changeAudio = async (eventData) => {
    let tmp = await Room.getLocalDevices()
    let device_data: any = null;
    console.log(tmp)
    tmp.forEach((device) => {
      for (const device of tmp) {
        if (device.label == eventData) {
          device_data = device;
          break;
        }
      }
    })
    if (device_data) {
      await room?.switchActiveDevice('audioinput', device_data.deviceId)
      createLocalVideoTrack({
        deviceId: device_data.deviceId,
      })
        .then((track: Track) => {
          track.attach(
            document.getElementById('my-audio') as HTMLVideoElement,
          )
          setlocalVideo(track)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    console.log(eventData)
  }

  const onCopyClick = () => {
    navigator.clipboard.writeText(`rtmp://teemo-world.link/live/${roomKey}`)
  }
  const onMouseEnter = () => {

  }

  const CopyClipboard =({content}) => {

    return ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-1 shadow-md shadow-slate-700 active:translate-y-1 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => navigator.clipboard.writeText(content)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>)
   }

  return (
    <div className="absolute flex flex-col w-full h-full bg-gray-400 justify-center items-center">
      <div className='flex flex-row justify-center items-center'>
        {`rtmp://teemo-world.link/live/${roomKey}`}
        <CopyClipboard content={`rtmp://teemo-world.link/live/${roomKey}`}/>
      </div>
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
