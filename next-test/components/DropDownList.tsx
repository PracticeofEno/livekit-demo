'use client'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import '../app/globals.css'
import { SetStateAction, useEffect, useState } from 'react'
import { Room } from 'livekit-client'

export default function DropDownList({ label, changeEvent }) {
  let [localDevices, setLocalDevices] = useState<MediaDeviceInfo[]>([])
  let [localVideoDevices, setLocalVideoDevices] = useState<MediaDeviceInfo[]>(
    [],
  )
  let [localAudioDevices, setLocalAudioDevices] = useState<MediaDeviceInfo[]>(
    [],
  )
  let [value, setValue] = useState('')

  useEffect(() => {
    async function fetchLocalDevices() {
      let tmp = await Room.getLocalDevices()
      let videos = tmp.filter((device: MediaDeviceInfo) => {
        return device.kind === 'videoinput'
      })
      let audios = tmp.filter((device: MediaDeviceInfo) => {
        return device.kind === 'audioinput'
      })
      setLocalDevices(tmp)
      setLocalAudioDevices(audios)
      setLocalVideoDevices(videos)
      if (label == 'video' && localVideoDevices.length > 0)
        setValue(localVideoDevices[0].label)
      else if (label == 'audio' && localAudioDevices.length > 0)
        setValue(localAudioDevices[0].label)
    }
    fetchLocalDevices()
  }, [])

  function tmp(e: { target: { value: SetStateAction<string> } }) {
    console.log(e.target)
    setValue(e.target.value)
    changeEvent(e.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={tmp}
      >
        {label == 'video'
          ? localVideoDevices?.map((device: any) => (
              <MenuItem key={device.label} value={device.label}>
                {device.label}
              </MenuItem>
            ))
          : localAudioDevices?.map((device: any) => (
              <MenuItem key={device.label} value={device.label}>
                {device.label}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  )
}
