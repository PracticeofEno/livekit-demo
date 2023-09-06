import axios, { type AxiosResponse } from "axios";

export async function getStreamKey() {
    const response = await axios.request({
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
      url: `/room/name`,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response.data;  
}

export async function getGuestLiveToken(room: string) {
  const response = await axios.request({
    method: 'POST',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    url: `/token/guest_live`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      room: room
    }
  })
  return response.data;  
}

export async function egressToRtmp(room: string) {
  console.log(room);
  const response = await axios.request({
    method: 'POST',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    url: `/egress/${room}`,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return response.data;  
}

export async function deleteRoom(room:string) {
  await axios.request({
    method: 'DELETE',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    url: `/room?room=${room}`,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}