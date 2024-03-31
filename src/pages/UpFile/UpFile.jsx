import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./UpFile.module.css"
import axios from "axios";
import GraphChart from "../../components/Chart/Chart";

const UpFile = () => {
    const [file, setFile] = useState(null);
    const [transferFile, setTransferFile] = useState(null)
    const [supportCount, setSupportCount] = useState(0);
    const [warning, setWarning] = useState('');
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        const fileInStorage = localStorage.getItem("file");
        if (fileInStorage === null) {
            setLoaded(false);
        }
        else {
            setTransferFile(JSON.parse(fileInStorage));
            setLoaded(true);
        }
    }, [])

    const handleSubmit = async () => {
        if (file) {
            var formData = new FormData();
            formData.append('file', file);
            try {
                const response = await axios.post(
                    'http://localhost:8080/v1/api/upload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                console.log(response.data);
                const path = response.data;
                localStorage.setItem('file', JSON.stringify(path));
                setTransferFile(path)
                setLoaded(true);
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    const handleSelectedFile = event => {
        const selectedFile = event.target.files[0];
        if (selectedFile.name.endsWith("csv")) {
            setFile(selectedFile);
            setWarning('');
        }
        else {
            setFile(null);
            setWarning('File không hợp lệ!');
        }
    };

    const handleGoClick = () => {
        handleSubmit();
        console.log(file)
    };

    return (
        <>
            <Header />
            <form className={styles.container} encType="multipart/form-data">
                <div className={styles.input_container}>
                    <div className={styles.input}>
                        <input type="file" name="" id="file" hidden onChange={handleSelectedFile} accept=".csv" required />
                        <label htmlFor="file">Upload</label>
                    </div>
                    <div className={styles.uploaded_file}>
                        <div className={styles.title}>Uploaded:</div>
                        <div className={styles.file_name}>{
                            file ? file.name : transferFile ? transferFile.storedName : ''
                        }</div>
                        <div className={styles.warning}>{warning}</div>
                    </div>
                    <div className={styles.support_threshold}>
                        <label htmlFor="supportthreshold">Support theshold:</label>
                        <input type="number" id="supporttheshold" value={supportCount} onChange={(e) => setSupportCount(e.target.value)} disabled />
                    </div>
                    <div className={styles.action}>
                        <input type="button" onClick={handleGoClick} value={"GO"} />
                    </div>
                </div>
            </form>
            {loaded && 
                <div className={styles.chart_container}>
                    <GraphChart data={transferFile}/>
                </div>
            }
        </>
    );
};

export default UpFile;
