import { useEffect, useState } from 'react';
import '../app/globals.css';
import { Room } from 'livekit-client';
import { Button } from '@mui/material';
import DropDownList from './DropDownList';

export default function LocalParticipantView() {
    let [localDevices, setLocalDevices] = useState<MediaDeviceInfo[]>([]);
    let [localVideoDevices, setLocalVideoDevices] = useState<MediaDeviceInfo[]>([]);
    let [localAudioDevices, setLocalAudioDevices] = useState<MediaDeviceInfo[]>([]);
    useEffect(() => {
        async function fetchLocalDevices() {
            let tmp = await Room.getLocalDevices();
            let videos = tmp.filter((device: MediaDeviceInfo) => {
                return device.kind === 'videoinput';
            })
            let audios = tmp.filter((device: MediaDeviceInfo) => {
                return device.kind === 'audioinput';
            })
            setLocalDevices(tmp);
            setLocalAudioDevices(audios);
            setLocalVideoDevices(videos);
            // Do something with localDevices
        }
        fetchLocalDevices();
    }, [localDevices, localVideoDevices, localAudioDevices])

    return (
      <div className="relative flex flex-col w-full h-full rounded-md border-black border">
        <div className='flex w-full h-[77%]'>
            <video id='participant-video' className='flex w-full h-full'/>
        </div>
        <div className='w-full h-[15%] bg-blue-400 flex flex-row justify-center items-center border-black rounded-md border-t'>
            <DropDownList label={"Video Devices"} arr={localVideoDevices}/>
            <DropDownList label={"Audio Devices"} arr={localAudioDevices}/>
        </div>
        <div className='flex w-full h-[8%] border-black rounded-md border-t'>
            <Button className="w-full" variant="outlined">접속하기</Button>
        </div>
      </div>
    )
}
  
