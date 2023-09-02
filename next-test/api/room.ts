import axios, { type AxiosResponse } from "axios";

export async function getRoomJwtCode(room: string, user:string) {
    const response = await axios.request({
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
      url: `/get_room_token?room=${room}&user=${user}`,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response.data;  
}