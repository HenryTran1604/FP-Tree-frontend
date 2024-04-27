import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './Metadata.module.css'
import GraphChart from '../../components/Chart/Chart';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Metadata = () => {
    const [file, setFile] = useState(null)
    const [metadata, setMetadata] = useState()

    useEffect(() => {
        const savedFile = localStorage.getItem('file')
        if (savedFile) {
            const foundFile = JSON.parse(savedFile)
            console.log(foundFile)
            setFile(foundFile);
        }
    }, [])



    useEffect(() => {
        const fetchMetadata = async () => {
            if (file) {
                console.log(`http://localhost:8080/v1/api/meta?fileName=${file.storedName}&numOfRecords=${20}`)

                try {
                    const response = await axios.get(`http://localhost:8080/v1/api/meta?fileName=${file.storedName}&numOfRecords=${20}`);
                    const responseData = response.data;
                    setMetadata(responseData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchMetadata();
    }, [file]);
    if (!metadata) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.info_container}>
                    <div className={styles.info_text}>
                        Số lượng giao dịch: {metadata.numOfTransactions}
                    </div>
                    <div className={styles.info_text}>
                        Số lượng items: {metadata.numOfItems}
                    </div>
                </div>
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
                                    metadata.transactions.map(({itemset, support}, idx) => (
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{itemset.join(", ")}</td>
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
                                    <td className={styles.table_title} colSpan={3}>
                                        Bảng tần suất
                                    </td>
                                </tr>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên item</th>
                                    <th>Support count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // console.log(typeof data)
                                    Object.entries(metadata.itemFrequencies).map((x, idx) => (
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td><Link to={`/pattern/${x[0]}`}>{x[0]}</Link> </td>
                                            <td>{x[1]}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>


                        </table>
                    </div>
                </div>

                <div className={styles.chart_container}>
                    <GraphChart data={metadata.itemFrequencies} />

                </div>
            </div>

        </div>
    );
};

export default Metadata;