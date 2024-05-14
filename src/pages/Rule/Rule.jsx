import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Rule.module.css'
import Header from '../../components/Header/Header';

const Rule = (props) => {
    const [file, setFile] = useState(null)
    const [data, setData] = useState(null)
    useEffect(() => {
        const savedFile = localStorage.getItem('file')
        if (savedFile) {
            const foundFile = JSON.parse(savedFile)
            // console.log(foundFile)
            setFile(foundFile);
        }
    }, [])
    useEffect(() => {
        const fetchTransactions = async () => {
            if (file) {
                try {
                    const response = await axios.get(`http://localhost:8080/v1/api/rules?fileName=${file.storedName}&minSup=${file.minSup}&minConf=${file.minConf}`);
                    const responseData = response.data;
                    setData(responseData);
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
                <h2>Thời gian xử lý: {data['duration']} (ms)</h2>
                <table className={styles.custom_table}>
                    <thead>
                        <tr >
                            <td className={styles.table_title} colSpan={5}>
                                Bảng transaction
                            </td>
                        </tr>
                        <tr>
                            <th>STT</th>
                            <th>Vế trái</th>
                            <th></th>
                            <th>Vế phải</th>
                            <th>Confident</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            // console.log(transactions)
                            data['rules'].map((x, idx) => (
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{x['antecedence'].itemset.join(", ")}</td>
                                    <td>=&gt;</td>
                                    <td>{x['consequence'].itemset.join(", ")}</td>
                                    <td>{x['confident']}</td>
                                </tr>
                            ))
                        }
                    </tbody>


                </table>
            </div>

        </div>

    );
};

export default Rule;
