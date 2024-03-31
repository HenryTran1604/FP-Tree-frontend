import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./UpFile.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpFile = () => {

    const [file, setFile] = useState('')
    const [supportCount, setSupportCount] = useState(0)
    const [warning, setWarning] = useState('')
    const navigate = useNavigate()


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
                )
                console.log(response.data)
                const path = response.data;
                localStorage.setItem('file', JSON.stringify(path));
                navigate("/tree")
            }
            catch (error) {
                console.log(error)
            }

        }
    }
    const handleSelectedFile = event => {
        const selectedFile = event.target.files[0]
        if (selectedFile.name.endsWith("csv")) {
            setFile(selectedFile)
            setWarning('')
        }
        else {
            setFile()
            setWarning('File không hợp lệ!')
        }
    }
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
                        <div className={styles.file_name}>{file ? file.name : ''}</div>
                        <div className={styles.warning}>{warning}</div>
                    </div>
                    <div className={styles.support_threshold}>
                        <label htmlFor="supportthreshold">Support theshold:</label>
                        <input type="number" id="supporttheshold" value={supportCount} onChange={(e) => setSupportCount(e.target.value)}/>
                    </div>
                    <div className={styles.action}>
                        <input type="button" onClick={handleSubmit} value={"GO"} />
                    </div>
                </div>
            </form>
        </>
    )
}
export default UpFile;