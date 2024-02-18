# livekit-demo
livekit-demo

- livekit의 egress(RTMP)를 이용하여 일반 사용자가 카메라를 사용하여 별도의 프로그램 없이 RTMP를 송출하고
- 다른 사용자가 (BJ가) 해당 RTMP를 사용하여 자신의 화면에 시청자의 카메라를 띄워줄 수 있는 기능

사용자가 webRTC를 이용하여 보내는 스트림을 RTMP로 내보내서 다른사람이 볼 수 있도록 함  
-> webRTC 기술을 이용하여 휴대폰/컴퓨터에서 화면을 송출받아 nginx로 rtmp프로토콜로 보내고, 다른 player장치(xsplit, obs등)에서 재생가능하게 만듬
