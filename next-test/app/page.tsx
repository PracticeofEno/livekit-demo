'use client'

import Link from "next/link"

export default function Page() {
  return (
    <div className="relative flex flex-col w-full h-full bg-gray-400 justify-center items-center text-justify">
      <h1 className="relative text-4xl">사용법</h1>
      <ol>
        <li>
          {"1. "}
          <Link className="text-blue-600" href="https://teemo-world.link/guestLive">https://teemo-world.link/guestLive</Link>
          {"에 접속"}
        </li>
        <li>
          2. 위의 rtmp://teemo-world.link/live/iaZPZi74aa 에 있는 주소 복사 버튼 클릭해서 공유
        </li>
        <li>
          3. BJ가 공유받은 주소를 OBS나 Xsplit에서 가져옴
        </li>
      </ol>
      <br></br>
      <h1 className="relative text-3xl">Xsplit 사용법</h1>
      <br></br>
      <img src="/images/1.png" className="w-96"></img>
      <br></br>
      <img src="/images/2.png" className="w-96"></img>
      <br></br>
      <h1 className="relative text-3xl">OBS 사용법</h1>
      <br></br>
      <img src="/images/3.png" className="w-96"></img>
      <br></br>
      <img src="/images/4.png" className="w-96"></img>
      <br></br>
    </div>
  )
}
