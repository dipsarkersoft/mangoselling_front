import React, { useEffect, useState } from 'react'
import { allProducts } from '../api/allapi'

export const MangoListCom = () => {
    const [allP,setAllP]=useState([])

const mangoList=async()=>{
    const {data}= await allProducts()
    setAllP(data)
    // console.log(data)
    
}

useEffect(()=>{
    mangoList()
},[])

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Mango List</h2>
      

<table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>MangoID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

            {
                allP?.map((iteam,i)=>
                     
                <>
                  <tr key={i}>
                <td>{iteam.id}</td>
                <td>{iteam.name}</td>
                <td>{iteam.price} TK</td>
                <td>{iteam.quantity}</td>
                <td>
                  {iteam.image ? (
                    <img
                      src={iteam.image}
                      alt={iteam.name}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td className='d-flex gap-2 '>
                    <button className='btn btn-success'>Edit</button>
                    <button className='btn btn-danger'>Del</button>
                </td>
              </tr>
                </> 

                )
            }

        
           
            
        
        
        </tbody>
      </table>
     
    </div>
  )
}

export default MangoListCom