import React, { useEffect, useState } from "react";
import styles from './Header.module.css'
import { Link } from "react-router-dom";

const Header = () => {
    const [fileName, setFileName] = useState();
    const [uploaded, setUploaded] = useState(true);

    useEffect(() => {
        const fileInStorage = localStorage.getItem("file");
        if (fileInStorage === null) {
            setUploaded(false);
        }
        else {
            setFileName(fileInStorage);
            setUploaded(true);
        }
    })

    return (
        <div className={styles.header}>
            <div className={styles.menu}>
                <Link className={styles.item} to={"/upfile"}>
                    Tải file lên
                </Link>
                {uploaded &&
                    <>
                        <Link className={styles.item} to={"/tree"}>
                            Chart
                        </Link>
                        <Link className={styles.item} to={"/tree"}>
                            Hiển thị cây
                        </Link>
                        <Link className={styles.item} to={"/itemset"}>
                            Tập frequent itemset
                        </Link>
                    </>
                }
            </div>
            <div className={styles.team}>

            </div>

        </div>
    )
}
export default Header;