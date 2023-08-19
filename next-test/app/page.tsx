'use client'
import DropDownList from '@/components/DropDownList'
import { Room, Track, createLocalVideoTrack } from 'livekit-client'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    async function fetchLocalDevices() {
      let tmp = await Room.getLocalDevices()
      tmp.forEach((device: MediaDeviceInfo) => {
        console.log(device)
        if (device.kind === 'videoinput' && device.deviceId == 'default') {
          createLocalVideoTrack({
            deviceId: device.deviceId,
          })
            .then((track: Track) => {
              console.log('aa')
              track.attach(
                document.getElementById('robby-video') as HTMLVideoElement,
              )
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      console.log(tmp)
      return tmp
    }
    fetchLocalDevices()
  })

  return (
    <div
      id="background"
      className="flex flex-col absolute w-full h-full justify-center items-center"
    >
      <div
        id="robby-template"
        className="relative flex flex-col w-[50%] h-[65%]  border rounded-md border-black"
      >
        <video
          id="robby-video"
          className="relative w-full h-[70%] border-b border-black"
        />
        <div
          id="track-template"
          className="flex flex-row w-full h-[10%] border-b border-black justify-center items-center"
        >
          <DropDownList label={'video'} />
          <DropDownList label={'audio'} />
        </div>
        <div
          id="roomName"
          className="relative flex w-full h-[10%] border-b border-black px-2 py-2 justify-center items-center"
        >
          <input
            type="text"
            id="last_name"
            className="absolute flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="RoomName"
            required
          />
        </div>
        <div
          id="btn-joinRoom"
          className="realtive flex w-full h-[10%] justify-center items-center border-b border-black"
        >
          <button
            id="btn-joinRoom"
            className="relative w-full h-full bg-blue-300 border-black border"
          >
            입장하기
          </button>
        </div>
      </div>
    </div>
  )
}
