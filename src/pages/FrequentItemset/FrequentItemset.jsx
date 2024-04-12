import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles  from './FrequentItemset.module.css'
import Header from '../../components/Header/Header';

const FrequentItemset = (props) => {
    const [file, setFile] = useState(null)
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
        const fetchTransactions = async () => {
            if (file) {
                try {
                    console.log(`http://localhost:8080/frequent-items?fileName=${file.storedName}&minSup=${file.minSup}`)
                    const response = await axios.get(`http://localhost:8080/frequent-items?fileName=${file.storedName}&minSup=${file.minSup}`);
                    const responseData = response.data;
                    setTransactions(responseData);
                    console.log(transactions)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchTransactions();
    }, [file]);

    if (transactions.length === 0) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>
            <Header/>
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

    );
};

export default FrequentItemset;
