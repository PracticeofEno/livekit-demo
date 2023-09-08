'use client'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import '../app/globals.css'
import { SetStateAction, useEffect, useState } from 'react'
import { Track, createLocalAudioTrack, createLocalVideoTrack } from 'livekit-client'

export default function DropDownList({ label, props_datas, changeData }: { label: string, props_datas: MediaDeviceInfo[], changeData: any }) {
  const [value, setValue] = useState<string>('')


  const onChanged = async (eventData: any) => {
    for (const device of props_datas) {
      console.log(eventData)
      if (device == eventData.target.value) {
        setValue(eventData.target.value)
        if (device.kind == 'videoinput') {
          changeData(eventData.target.value)
          createLocalVideoTrack({
            deviceId: device.deviceId,
          })
            .then((track: Track) => {
              track.attach(
                document.getElementById('my-video') as HTMLVideoElement,
              )
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          changeData(eventData.target.value)
          createLocalAudioTrack({
            deviceId: device.deviceId,
          })
            .then((track: Track) => {
              track.attach(
                document.getElementById('my-audio') as HTMLAudioElement,
              )
            })
            .catch((err) => {
              console.log(err)
            })
        }
        break;
      }
    }
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        defaultValue=''
        label="Age"
        onChange={onChanged}
      >
        {
          props_datas?.map((device: any) => (
            <MenuItem key={device.label} value={device}>
              {device.label}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}
