import React from 'react'
import { useParams , useNavigate} from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axios from 'axios';
import { useEffect,useState } from 'react';
import "../../Css_files/VideoCall.css"
import PatientSideNav from '../../components/PatientSideNav';


const RoomPage=()=>{

    const min = 100000;
    const max = 999999;
    const roomId = Math.floor(Math.random() * (max - min + 1)) + min;
    const roomnum = roomId.toString();
    console.log(roomnum)
    const jwtToken=localStorage.getItem('token');
    const patient_obj=JSON.parse(localStorage.getItem('patient'));
    const name = patient_obj['patientName'];
    const navigate = useNavigate();
    const patientId = patient_obj['patientId'];
    const patientNumber = patient_obj['phoneNumber'];

    const myMeeting =(element) =>{

        const appID =2066795294
        const serverSecret ="dd1496412c994d3e0f2b99f6717683e1";
        const kitToken =ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomnum,roomnum,name);
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom(
            {
            container:element,
            scenario:{
               mode:ZegoUIKitPrebuilt.VideoConference
            },
            maxUsers: 2,
            turnOnCameraWhenJoining: false,
            turnOnMicrophoneWhenJoining: false,
            showLeavingView: false,
            onLeaveRoom: (()=>{
              navigate('/PatientDashboard',{
                 state:{patient_id:patientId}
              })
            })
        }
        )
    }
    
    useEffect(()=>{
        axios.defaults.headers.common['Authorization']=`Bearer ${jwtToken}`;
        axios.post(`http://localhost:8081/patient/join-queue/${patientId}?roomId=${roomId}`,)
        .then((response)=>{
            console.log('queue success');
        })
        .catch((error)=>{
          console.error('error on adding to queue',error);
        });
        return ()=>{ console.log('return')}
    },[])

    return (
       <>
       <PatientSideNav/>
      <div className='RoomCss'>
        <div ref={myMeeting}></div>
      </div>
      </>
    )
}

export default RoomPage;