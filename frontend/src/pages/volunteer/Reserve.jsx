import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenCheck } from '../../components/TokenCheck';
import { format } from 'date-fns';
import CalendarReserve from '../../components/CalendarReserve';
import { FiCircle } from 'react-icons/fi'

function Reserve() {
  const [receivedData, setReceivedData] = useState(null);
  const userInfo = useContext(TokenCheck);
  console.log(userInfo.emailVerify);

  const handleReceiveData = (sendData) => {
    setReceivedData(sendData);
  }

  const nav = useNavigate();

  function stringFormat(str) {
    const string = str + "";
    const year = string.substring(0, 4);
    const month = string.substring(4, 6);
    const date = string.substring(6, string.length);
    return year + "-" + month + "-" + date;
  }

  const fetchApplication = async () => {

    if(userInfo.emailVerify == "N") {
      alert("이메일 인증이 필요합니다.")
      nav("/mypage");
      return;
    }

    await fetch('/api/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: receivedData.data,
        date: format(receivedData.selectedDay, 'yyyyMMdd'),
        id: userInfo.userId,
      })
    })
      .catch(err => {
        console.log("err : ", err);
        throw err;
      })
      alert("신청이 완료되었습니다.");
      nav("/");
  }

  const handleDeny = () => {
    setReceivedData(null);
  }

  return (
    <>
      <div className='pageTitle'><span>봉사활동 신청하기</span></div>
      <main>
        {
          receivedData === null ?
            <CalendarReserve sendDataToReserve={handleReceiveData} />
            :
            <div className='reserveConfirm'>
              <div className='reserveInfo'>
                <div className='reserveInfoTitle'>신청 내역 확인</div>
                <div className='reserveDetail1'>
                  <span><strong>활동명</strong> : {receivedData.data.progrmSj + "  "}</span>
                  <span><strong>주소</strong> : {receivedData.data.nanmmbyNm + "  "}</span>
                  <span><strong>장소</strong> : {receivedData.data.actPlace + "  "}</span>
                </div>
                <div className='reserveDetail2'>
                  <span><strong>봉사시간</strong> : {receivedData.data.actBeginTm}시 ~ {receivedData.data.actEndTm}시</span>
                  <span><strong>봉사분야</strong> : {receivedData.data.srvcClCode}</span>
                </div>
                <div className='reserveDetail3'>
                  <span>선택일자 : <strong>{format(receivedData.selectedDay, 'yyyy-MM-dd')}</strong></span>
                  <span>선택하신 일자가 맞습니까?</span>
                  <div className='btnChoose'>
                    <button id='btnConfirm' onClick={() => fetchApplication()}>네</button>
                    <button id='btnDeny' onClick={handleDeny}>아니오</button>
                  </div>
                </div>
              </div>
            </div>
        }
      </main>
    </>
  )
}

export default Reserve