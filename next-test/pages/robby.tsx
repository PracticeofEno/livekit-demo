import '../app/globals.css'
import LocalParticipantView from '@/components/LocalParticipant'
import RemoteParticipantView from '@/components/RemoteParticipant'

export default function Robby() {
  return (
    <div className="absolute flex flex-row w-full h-full bg-gray-400 justify-center items-center">
      <div className="w-96 h-96">
        <LocalParticipantView />
      </div>
      <div className="w-96 h-96">
        <RemoteParticipantView />
      </div>
    </div>
  )
}
