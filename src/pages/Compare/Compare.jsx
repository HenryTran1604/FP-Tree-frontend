import React, { useEffect, useState } from 'react'
import LineChart from '../../components/Chart/LineChart'
import Header from '../../components/Header/Header'
import styles from './Compare.module.css'
const Compare = () => {
    const [dataSet,setDataSet] = useState("")
    const [compareData,setCompareData] = useState({})
    useEffect(()=>{
       const storedData = localStorage.getItem("file")
       if(storedData){
        console.log(storedData)
        setDataSet(JSON.parse(storedData).displayName)
       }
    },[dataSet])

    useEffect(()=>{
        const fetchData = ()=>{
            fetch(`http://localhost:8080/v1/api/compare?fileName=${dataSet.storedName}`)
            .then(res => res.json())
            .then(data => {
                setCompareData(data)
            })
            .catch(err => console.log(err))
        }
        fetchData()
    },[compareData])
    const data = {
        runTime: {
            fpTree: [200,160,150,130,100,70,60,50,40,10],
            apriori: [1200,1160,850,730,600,570,460,350,240,110]
        },
        memory:{
            fpTree: [120,100,88,76,65,50,45,40,30,24],
            apriori: [340,300,260,230,196,150,144,110,80,50]
        }
    }

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>So sánh 2 phương pháp FP-Tree và Apriori {dataSet!=="" && <span>trên bộ dữ liệu {dataSet}</span>}</h1>
                <div className={styles.chartsContainer} >
                    <div className={styles.chart}>
                        <h2 className={styles.chartTitle}>Thời gian chạy theo minsup</h2>
                        <LineChart displayData={data.runTime} yLabel="Thời gian chạy (ms)" />
                    </div>
                    <div className={styles.chart}>
                        <h2 className={styles.chartTitle}>Bộ nhớ sử dụng theo minsup</h2>
                        <LineChart displayData={data.memory}  yLabel="Bộ nhớ sử dụng (kB)" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compare