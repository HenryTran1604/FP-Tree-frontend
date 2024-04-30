import React, { useEffect, useState } from 'react'
import LineChart from '../../components/Chart/LineChart'
import Header from '../../components/Header/Header'
import styles from './Compare.module.css'
const Compare = () => {
    const [file, setFile] = useState(null)
    const [compareData, setCompareData] = useState({
        duration:{
            apriori:[],
            fpTree:[]
        },
        memory:{
            apriori:[],
            fpTree:[]
        },
    })
    useEffect(() => {
        const storedData = localStorage.getItem("file")
        if (storedData) {
            console.log(storedData)
            setFile(JSON.parse(storedData))
            console.log(storedData)
        }
    }, [])

    useEffect(() => {
        if (file) {
            console.log(`http://localhost:8080/v1/api/compare?fileName=${file.storedName}`)
            const fetchData = () => {
                fetch(`http://localhost:8080/v1/api/compare?fileName=${file.storedName}`)
                    .then(res => res.json())
                    .then(data => {
                        setCompareData(data)
                    })
                    .catch(err => console.log(err))
            }
            fetchData()
        }
    }, [file])

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>So sánh 2 phương pháp FP-Tree và Apriori {file !== null && <span>trên bộ dữ liệu {file.displayName}</span>}</h1>
                <div className={styles.chartsContainer} >
                    <div className={styles.chart}>
                        <h2 className={styles.chartTitle}>Thời gian chạy theo minsup</h2>
                        <LineChart displayData={compareData.duration} yLabel="Thời gian chạy (ms)" />
                    </div>
                    <div className={styles.chart}>
                        <h2 className={styles.chartTitle}>Bộ nhớ sử dụng theo minsup</h2>
                        <LineChart displayData={compareData.memory} yLabel="Bộ nhớ sử dụng (kB)" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compare