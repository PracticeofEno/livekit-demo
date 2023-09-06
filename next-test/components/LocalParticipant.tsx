import { useEffect, useState } from 'react'
import '../app/globals.css'
import { LocalParticipant, Room, Track, createLocalTracks } from 'livekit-client'
import { Button } from '@mui/material'
import DropDownList from './DropDownList'
import router from 'next/router'

export default function LocalParticipantView({ props_lp } : { props_lp: LocalParticipant }) {
  const [localParticipant, setLocalParticipant] = useState<LocalParticipant>()
  useEffect(() => {
    setLocalParticipant(props_lp)
    async function init() {
      let localTracks: Track[] = []
      try {
        localTracks = await createLocalTracks()
      }
      catch(e) {
        alert('카메라 및 마이크를 허용해주세요.')
        router.push('/');
      }
      for (const track of localTracks) {
        console.log(track)
        if (track.kind == Track.Kind.Video) {
          track.attach(document.getElementById('my-video') as HTMLVideoElement)
        }
        else {
          track.attach(document.getElementById('my-audio') as HTMLVideoElement)
        }
      }
    }
    init()
    // room.on('localTrackUnpublished', onLocalTrackUnpublished)
    
  }, [])

  return (
    <div className="flex flex-col w-full h-full rounded-md border-black border justify-center items-center">
      <video id='my-video' className='flex w-[80%] h-[80%]'></video>
      <audio id='my-audio'></audio>
    </div>
  )
}
