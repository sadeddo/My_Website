import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Quartier from '../components/quartier'
import { fetchQuartierData } from '../services/Quartiers/QuartierService';

const quartiers: NextPage = () => {
    const [data, setData] = useState(null)
    useEffect(()=> {
        fetchQuartierData(1).then((data)=>{
            setData(data);
        })
    },[])
  return (
    <div>
    {data && data.map((quartier, i)=>{
         return (<Quartier nom={quartier.email}/>)
    })}
  </div>
  )
}

export default quartiers
