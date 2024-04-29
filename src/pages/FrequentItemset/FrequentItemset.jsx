import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './FrequentItemset.module.css'
import Header from '../../components/Header/Header';

const FrequentItemset = (props) => {
    const [file, setFile] = useState(null)
    const [data, setData] = useState(null)
    useEffect(() => {
        const savedFile = localStorage.getItem('file')
        if (savedFile) {
            const foundFile = JSON.parse(savedFile)
            console.log(foundFile)
            setFile(foundFile);
        }
    }, [])
    useEffect(() => {
        const fetchTransactions = async () => {
            if (file) {
                try {
                    console.log(`http://localhost:8080/v1/api/frequent-items?fileName=${file.storedName}&minSup=${file.minSup}`)
                    const response = await axios.get(`http://localhost:8080/v1/api/frequent-items?fileName=${file.storedName}&minSup=${file.minSup}`);
                    const responseData = response.data;
                    setData(responseData);
                    console.log(responseData['frequentItemSet'])
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchTransactions();
    }, [file]);

    if (!data) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h1>{data['duration']}</h1>
                <table className={styles.custom_table}>
                    <thead>
                        <tr >
                            <td className={styles.table_title} colSpan={3}>
                                Bảng transaction
                            </td>
                        </tr>
                        <tr>
                            <th>STT</th>
                            <th>Danh sách items</th>
                            <th>Support</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            // console.log(transactions)
                            data['frequentItemSet'].map(({ itemset, support }, idx) => (
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{itemset.join(", ")}</td>
                                    <td>{support}</td>
                                </tr>
                            ))
                        }
                    </tbody>


                </table>
            </div>

        </div>

    );
};

export default FrequentItemset;
