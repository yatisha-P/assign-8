import React from 'react'

export default function 
(props) {
  let {filterData, pageCount} = props;
  // Array(pageCount).fill(1).map((v,i)=>{
  //   console.log(v,i);
  // });
  return (
    <>

<div className="col-12 d-flex justify-content-center">
              <ul className="pages">

                {
                    Array(pageCount).fill(1).map((v,i)=>{
                      // console.log(v,i);
                     return(<li onClick={(event)=>filterData(event,"page")} key={i} value={i+1} name="n" className='btn btn-outline-primary'>{i+1}</li>)
                      
                    })
                }


{/* 
                <li onClick={(event)=>filterData(event,"page")} value="0" name="n" className='btn btn-outline-primary' >&lt;</li>
                <li onClick={(event)=>filterData(event,"page")} value="1" name="n" className='btn btn-outline-primary'>1</li>
                <li onClick={(event)=>filterData(event,"page")} value="2" name="n" className='btn btn-outline-primary' >2</li>
                <li onClick={(event)=>filterData(event,"page")} value="3" name="n" className='btn btn-outline-primary' >3</li>
                <li onClick={(event)=>filterData(event,"page")} value="4" name="n" className='btn btn-outline-primary' >4</li>
                <li onClick={(event)=>filterData(event,"page")} value="5" name="n" className='btn btn-outline-primary' >&gt;</li> */}
              </ul>
            </div>
    </>
  )
}
