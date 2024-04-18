import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./UpFile.module.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UpFile = () => {
    const [loadedFile, setLoadedFile] = useState(null);
    const [storedFile, setStoredFile] = useState(null)
    const [minSup, setMinSup] = useState(0.05);
    const [minConf, setMinConf] = useState(0.5);
    const [warning, setWarning] = useState('');
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        const fileInStorage = localStorage.getItem("file");
        if (fileInStorage === null) {
            setLoaded(false);
        }
        else {
            setStoredFile(JSON.parse(fileInStorage));
            setLoaded(true);
        }
    }, [])

    const handleSubmit = async () => {
        if (loadedFile) {
            var formData = new FormData();
            formData.append('file', loadedFile);
            formData.append('minSup', minSup)
            formData.append('minConf', minConf)
            try {
                const response = await axios.post(
                    'http://localhost:8080/v1/api/storage/upload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                const path = response.data;
                localStorage.setItem('file', JSON.stringify(path));
                setStoredFile(path)
                setLoaded(true);
                navigate('/meta')
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    const handleSelectedFile = event => {
        const selectedFile = event.target.files[0];
        if (selectedFile.name.endsWith("csv")) {
            setLoadedFile(selectedFile);
            setWarning('');
        }
        else {
            setLoadedFile(null);
            setWarning('File không hợp lệ!');
        }
    };

    const handleGoClick = () => {
        handleSubmit();
        console.log(loadedFile)
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
                            loadedFile ? loadedFile.name : storedFile ? storedFile.displayName : ''
                        }</div>
                        <div className={styles.warning}>{warning}</div>
                    </div>
                    <div className={styles.support_threshold}>
                        <label htmlFor="threshold">Min sup:</label>
                        <input type="number" id="threshold" value={minSup} onChange={(e) => setMinSup(e.target.value)} />
                    </div>
                    <div className={styles.support_threshold}>
                        <label htmlFor="threshold">Min conf:</label>
                        <input type="number" id="threshold" value={minConf} onChange={(e) => setMinConf(e.target.value)} />
                    </div>
                    <div className={styles.action}>
                        <input type="button" onClick={handleGoClick} value={"GO"} />
                    </div>
                </div>
            </form>
        </>
    );
};

export default UpFile;
