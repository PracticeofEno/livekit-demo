import DropDownList from '@/components/DropDownList'
import '../app/globals.css'
import {
  LocalParticipant,
  LocalTrackPublication,
  Room,
  Track,
  VideoPresets,
} from 'livekit-client'
import { useEffect, useState } from 'react'
import { deleteRoom, egressToRtmp, getGuestLiveToken, getStreamKey } from '@/api/room'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import LocalParticipantView from '@/components/LocalParticipant'

export default function GuestLive() {
  const [room, setRoom] = useState<Room>()
  const [roomKey, setStreamKey] = useState<string>()
  const [localParticipant, setLocalParticipant] = useState<LocalParticipant>()
  const [localDevices, setLocalDevices] = useState<MediaDeviceInfo[]>()
  const [vidoes, setVideos] = useState<MediaDeviceInfo[]>()
  const [audios, setAudios] = useState<MediaDeviceInfo[]>()

  useEffect(() => {
    async function initialize() {
      const at = await getGuestLiveToken("123");
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
      const localDevices2 = await Room.getLocalDevices()
      const video2 = localDevices2.filter((device) => {
        if (device.kind == 'videoinput') {
          return device
        }
      })
      setVideos(video2)
      const audios2 = localDevices2.filter((device) => {
        if (device.kind == 'audioinput') {
          return device
        }
      })
      setAudios(audios2)
      await room.localParticipant.getTrack
      setLocalDevices(localDevices2)

      room.on('localTrackUnpublished', onLocalTrackUnpublished)
      await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL as string, at)
      setLocalParticipant(room.localParticipant)
      await room.localParticipant.enableCameraAndMicrophone()
      await egressToRtmp("123")
    }
    initialize();
    return () => {
      if (roomKey)
        deleteRoom(roomKey);
    }
  }, [])

  const onLocalTrackUnpublished = async (publication: LocalTrackPublication, participant: LocalParticipant) => {
    console.log(`unpublish Localtrack `)
    console.log(publication)

    if (publication?.track) {
      if (publication?.track.source == Track.Source.ScreenShare) {
        // console.log(await room?.localParticipant.tracks)
        // await room?.localParticipant.videoTracks()
        // console.log(await room?.localParticipant.get)
        // await room?.localParticipant.publishTrack()
      }
    }

  }

  const screenShare = async () => {
    let localParticipants_tracks = await room?.localParticipant.tracks
    localParticipants_tracks?.forEach((track => {
      console.log(track)
      if (track?.track) {
        room?.localParticipant.unpublishTrack(track?.track)
      }
    }))
    let publication = await room?.localParticipant.setScreenShareEnabled(true)
    if (publication?.track) {
      publication?.track.attach(document.getElementById('my-video') as HTMLVideoElement)
      // room?.localParticipant.get
      await room?.localParticipant.publishTrack(publication?.track)
    }
  }

  const CopyClipboard = ({ content }: any) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-1 shadow-md shadow-slate-700 active:translate-y-1 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => navigator.clipboard.writeText(content)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>)
  }
  const onSelectChanged = async (eventData: any) => {
    await room?.switchActiveDevice(eventData.kind, eventData.deviceId)
  }

  return (
    <div className="absolute flex flex-col w-full h-full bg-gray-400 justify-center items-center">
      <div className='flex flex-row justify-center items-center h-[3%]'>
        {`rtmp://teemo-world.link/live/123`}
        <CopyClipboard content={`rtmp://teemo-world.link/live/${roomKey}`} />
      </div>
      <div className='relative flex flex-row w-full h-[65%] bg-red-400 justify-center items-center'>
        <LocalParticipantView props_lp={localParticipant} />
      </div>
      <div className='relative flex flex-row w-full h-[8%] bg-blue-400'>
        <DropDownList label={'video'} props_datas={vidoes as MediaDeviceInfo[]} changeData={onSelectChanged} />
        <DropDownList label={'audio'} props_datas={audios as MediaDeviceInfo[]} changeData={onSelectChanged} />
      </div>
      <div className='relative flex flex-row w-full h-[5%] bg-blue-300'>
        <Button className='flex w-full' onClick={screenShare}>컴퓨터 화면 공유</Button>
      </div>
      <div className='relative flex flex-row w-full h-[22%] bg-white'>
      </div>
    </div>
  )
}
