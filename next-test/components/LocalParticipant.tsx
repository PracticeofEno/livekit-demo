import { useEffect, useState } from 'react';
import '../app/globals.css';
import { Room } from 'livekit-client';

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
        <div className='flex w-full h-[80%]'>
            <video id='participant-video' className='flex w-full h-full'/>
        </div>
        <div className='w-full h-[20%] bg-blue-400 flex flex-row'>
            {
                localVideoDevices?.map((device: MediaDeviceInfo) => (
                    <li key={device.label}>{device.label}</li>
                ))
            }
            {
                localAudioDevices?.map((device: MediaDeviceInfo) => (
                    <li key={device.label}>{device.label}</li>
                ))
            }
        </div>
      </div>
    )
}
  
