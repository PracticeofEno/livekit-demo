import '../app/globals.css';

export default function RemoteParticipantView() {
    return (
      <div className="relative flex flex-col w-full h-full rounded-md border-black border">
        <div className='flex w-full h-[100%]'>
			<video id='participant-video' className='flex w-full h-full'/>
        </div>
      </div>
    )
}
  
