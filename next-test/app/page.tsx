'use client'
import DropDownList from '@/components/DropDownList'
import {
  Room,
  Track,
  createLocalAudioTrack,
  createLocalVideoTrack,
} from 'livekit-client'
import { useEffect, useState } from 'react'

export default function Page() {
  let [roomName, setRoomName] = useState('')
  useEffect(() => {
    async function fetchLocalDevices() {
      let tmp = await Room.getLocalDevices()
      let videosDetect = false
      let audioDetect = false
      for (let i = 0; i < tmp.length; i++) {
        if (!videosDetect) {
          if (tmp[i].kind == 'videoinput') {
            videosDetect = true
            createLocalVideoTrack({
              deviceId: tmp[i].deviceId,
            })
              .then((track: Track) => {
                track.attach(
                  document.getElementById('robby-video') as HTMLVideoElement,
                )
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
        if (!audioDetect) {
          if (tmp[i].kind == 'audioinput' && tmp[i].deviceId != 'default') {
            audioDetect = true
            createLocalAudioTrack({
              deviceId: tmp[i].deviceId,
            })
              .then((track: Track) => {
                track.attach(
                  document.getElementById('robby-video') as HTMLVideoElement,
                )
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
      }
      return tmp
    }
    fetchLocalDevices()
  })

  const changeVideo = async (eventData) => {
    let tmp = await Room.getLocalDevices()
    console.log(tmp)
    tmp.forEach((device) => {
      if (device.label == eventData) {
        createLocalVideoTrack({
          deviceId: device.deviceId,
        })
          .then((track: Track) => {
            track.attach(
              document.getElementById('robby-video') as HTMLVideoElement,
            )
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
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
              document.getElementById('robby-video') as HTMLVideoElement,
            )
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    console.log(eventData)
  }

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
          <DropDownList label={'video'} changeEvent={changeVideo} />
          <DropDownList label={'audio'} changeEvent={changeAudio} />
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
            value={roomName}
            required
          />
          {roomName}
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
