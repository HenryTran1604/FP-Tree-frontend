import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './Metadata.module.css'
import GraphChart from '../../components/Chart/Chart';
import axios from 'axios';

const Metadata = () => {
    const [file, setFile] = useState(null)
    const [detail, setDetail] = useState(null)
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const savedFile = localStorage.getItem('file')
        if (savedFile) {
            const foundFile = JSON.parse(savedFile)
            console.log(foundFile)
            setFile(foundFile);
        }
    }, [])

    useEffect(() => {
        const fetchDetail = async () => {
            if (file) {
                try {
                    const response = await axios.get(`http://localhost:8080/updated/detail?fileName=${file.storedName}`);
                    const responseData = response.data;
                    setDetail(responseData);
                    console.log(responseData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchDetail();
    }, [file]);


    useEffect(() => {
        const fetchTransactions = async () => {
            if (file) {
                try {
                    const response = await axios.get(`http://localhost:8080/transactions?fileName=${file.storedName}&numOfRecords=${20}`);
                    const responseData = response.data;
                    setTransactions(responseData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchTransactions();
    }, [file]);
    if (!detail) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.detail}>
                    <div className={styles.item_detail} >
                        <table className={styles.custom_table}>
                            <thead>
                                <tr >
                                    <td className={styles.table_title} colSpan={2}>
                                        Bảng transaction
                                    </td>
                                </tr>
                                <tr>
                                    <th>STT</th>
                                    <th>Danh sách items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // console.log(typeof data)
                                    Object.entries(transactions).map((x) => (
                                        <tr>
                                            <td>{parseInt(x[0]) + 1}</td>
                                            <td>{x.slice(1).join(",   ")}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>


                        </table>
                    </div>
                    <div className={styles.item_detail}>
                        <table className={styles.custom_table}>
                            <thead>
                                <tr >
                                    <td className={styles.table_title} colSpan={2}>
                                        Bảng tần suất
                                    </td>
                                </tr>
                                <tr>
                                    <th>Tên item</th>
                                    <th>Support count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // console.log(typeof data)
                                    Object.entries(detail).map((x) => (
                                        <tr>
                                            <td>{x[0]}</td>
                                            <td>{x[1]}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>


                        </table>
                    </div>
                </div>

                <div className={styles.chart_container}>
                    <GraphChart data={detail} />

                </div>
            </div>

        </div>
    );
};

export default Metadata;