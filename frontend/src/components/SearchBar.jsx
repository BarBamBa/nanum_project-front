import { useState } from 'react'
import '/src/scss/Volunteer.scss'
import { IoIosArrowUp } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai'
import RcodeSelect from './RcodeSelect';
import VCodeSelect from './VCodeSelect';
import Calendar from './Calendar';


function SearchBar({ params, setParams, setData, setCount,
                     setPage, setMoreData, onCheck, handleCheck }) {

  // const {data} = props;
  const [ onSearchHeader, setOnSearchHeader ] = useState(true);


  // 카테고리 헤더 열기닫기 기능
  function handleSearchHeader() {
    setOnSearchHeader(!onSearchHeader);
  }

  function handleAdultCheck() {
    if(params.adultPosblAt === 'Y') {
      setParams({
        ...params,
        adultPosblAt: '',
      });
    } else {
      setParams({
        ...params,
        adultPosblAt: 'Y',
      });
    }
  }

  function handleYoungCheck() {
    if(params.yngbgsPosblAt === 'Y') {
      setParams({
        ...params,
        yngbgsPosblAt: '',
      });
    } else {
      setParams({
        ...params,
        yngbgsPosblAt: 'Y',
      });
    }
  }

  // 검색 버튼 클릭 이벤트
  const handleSearch = async() => {
    await fetch('/api/list', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...params,
        pageNo: '1',
      })
    })
    .then(res => res.json())
    .then(res => {
      setData(res.items.item);
      setCount(res.totalCount);
    })
    .catch((error) => {
      setMoreData(false);
      return;
    });
  }

  // 초기화 버튼 클릭 이벤트
  const handleSearchInit = () => {
    setParams({
      numOfRows: '10',
      pageNo: '1',
      schCateGu: 'all',
      keyword: '',
      schSido: '',
      schSign1: '',
      schupperClCode: '',
      schnanmClCode: '',
      schprogrmBgnde: '',
      progrmEndde: '',
      adultPosblAt: '',
      yngbgsPosblAt: '',
    });
    setPage(1);
  } 

  return (
    <div className='searchBar'>
      <div className='searchHeader'>
        <span onClick={handleSearchHeader}>{onSearchHeader ? "검색목록 닫기" : "검색목록 열기"}
        <IoIosArrowUp 
          className= {`searchArrow ${onSearchHeader ? '' : 'down'}`}
        />
        </span>
      </div>
      <div className={`searchContents ${onSearchHeader ? '' : 'closed'}`}>
          <div className='table'>
            <div className='tableTr'>
              <div className='trTitle'>봉사분야</div>
              <div className='tableTdField'>
                  <VCodeSelect params={params} setParams={setParams} />
              </div>
            </div>
            <div className='tableTr'>
              <div className='trTitle'>지역</div>
                <div className='tableTd'>
                  <RcodeSelect params={params} setParams={setParams} />
                </div>
              <div className='trTitle'>연령제한</div>
              <div className='tableTd'>
                <div className='checkboxCustom'>
                  {/* 성인체크박스 */}
                  <input type='checkbox' id='adult' />
                  <label htmlFor="adult" onClick={handleAdultCheck}></label>
                  <span>성인</span>
                  {/* 청소년체크박스 */}
                  <input type='checkbox' id='student' />
                  <label htmlFor="student" onClick={handleYoungCheck}></label>
                  <span>청소년</span>
                </div>
              </div>  
            </div>
            <div className='tableTr'>
              <div className='trTitle'>봉사기간</div>
              <div className='tableTd'><Calendar params={params} setParams={setParams} /></div>
            </div>
            <div className='tableTr'>
              <div className='trTitle'>모집상태</div>
              <div className='status' colSpan='3'>
                {/* 모집대기버튼 */}
                <input type='checkbox' id='statusWait' checked={onCheck === 1} readOnly/>
                <label htmlFor='statusWait' onClick={() => handleCheck(1)}>모집대기</label>
                {/* 모집중버튼 */}
                <input type='checkbox' id='statusIng' checked={onCheck === 2} readOnly/>
                <label htmlFor='statusIng' onClick={() => handleCheck(2)}>모집중</label>
                {/* 모집완료버튼 */}
                <input type='checkbox' id='statusDone' checked={onCheck === 3} readOnly/>
                <label htmlFor='statusDone' onClick={() => handleCheck(3)}>모집완료</label>
              </div>
            </div>
            <div className='tableTr'>
              <div className='trTitle'>검색어</div>
              <div className='keyword'>
                {/* 검색어 */}
                <input type='text' id='keyword' placeholder='검색어를 입력해주세요' value={params.keyword} onChange={(e) => {
                  setParams({
                    ...params,
                    keyword: e.target.value,
                  })
                }}/>
              </div>
            </div>
            <div className='btnBox'>
              <button onClick={handleSearch} id='btnSearch'>찾기</button>
              <button onClick={handleSearchInit} id='btnReset'>초기화</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SearchBar