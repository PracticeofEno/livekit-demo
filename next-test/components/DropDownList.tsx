'use client'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import '../app/globals.css'
import { SetStateAction, useEffect, useState } from 'react'
import { Track, createLocalAudioTrack, createLocalVideoTrack } from 'livekit-client'

export default function DropDownList({ label, props_datas} : { label: string, props_datas: MediaDeviceInfo[]}) {
  const [value, setValue] = useState<string>('')

  function tmp(e: { target: { value: SetStateAction<string> } }) {
    console.log(e.target)
    setValue(e.target.value)
    // changeEvent(e.target.value)
  }

  const onChanged = async (eventData: any) => {
    for (const device of props_datas) {
      if (device.label == eventData.target.value.label) {
        setValue(device)
        if (device.kind == 'videoinput') {
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
