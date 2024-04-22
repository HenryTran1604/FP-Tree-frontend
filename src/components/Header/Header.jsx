import React, { useEffect, useState } from "react";
import styles from './Header.module.css'
import { Link } from "react-router-dom";

const Header = () => {
    const [file, setFile] = useState(null);

    useEffect(() => {
        const savedFile = localStorage.getItem('file')
        if (savedFile) {
            const foundFile = JSON.parse(savedFile)
            console.log(foundFile)
            setFile(foundFile);
        }
    }, [])

    return (
        <div className={styles.header}>
            <div className={styles.menu}>
                <Link className={styles.item} to={"/"}>
                    Tải file lên
                </Link>
                {file &&
                    <>
                        <Link className={styles.item} to={"/meta"} >
                            Metadata
                        </Link>
                        <Link className={styles.item} to={"/tree"}>
                            Hiển thị cây
                        </Link>
                        <Link className={styles.item} to={"/itemset"}>
                            Tập frequent itemset
                        </Link>
                        <Link className={styles.item} to={"/rule"}>
                            Rules
                        </Link>
                    </>
                }
            </div>
            <div className={styles.item}>
                {
                    // console.log(file)
                    file &&
                    <>
                        <div className={styles.file_container}>
                            <div> {file.displayName} </div>
                            <div className={styles.weight}>
                                <span className={styles.minsup}>minSup: {file.minSup}</span>
                                <span className={styles.minsup}>minConf: {file.minConf}</span>
                            </div>
                            
                        </div>
                        
                    </>
                }
            </div>

        </div>
    )
}
export default Header;