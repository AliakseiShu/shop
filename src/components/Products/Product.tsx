import React, {FC, useEffect, useState} from 'react';

import styles from '../../styles/Product.module.css';
import {IProduct} from "./Products";
import {Link} from "react-router-dom";
import {ROUTES} from "../../utils/routes";

const SIZES = [4, 4.5, 5]

export const Product: FC<IProduct> = ({images, title, price, description}) => {

    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect(() => {
        if(!images.length) return
        setCurrentImage(images[0])
    }, [images]);

    return (
        <section className={styles.product}>
            <div className={styles.images}>
                <div className={styles.current} style={{backgroundImage: `url(${currentImage})`}}/>
                <div className={styles.imagesList}>
                    {images.map((image, i) => (
                        <div key={i} className={styles.image} style={{backgroundImage: `url(${image})`}}
                             onClick={() => setCurrentImage(image)}/>
                    ))}
                </div>
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.price}>{price}$</div>
                <div className={styles.color}>
                    <span>Color:</span> Green
                </div>
                <div className={styles.sizes}>
                    <span>Sizes:</span>

                    <div className={styles.list}>
                        {SIZES.map((size) => (
                            <div onClick={() => {
                            }} className={`${styles.size}`} key={size}>
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <p className={styles.description}>{description}</p>
                <div className={styles.actions}>
                    <button className={styles.add}>Add to cart</button>
                    <button className={styles.favourite}>Add to favourite</button>
                </div>
                <div className={styles.bottom}>
                    <div>10 people purchased</div>
                    <Link to={ROUTES.HOME}>Return to store</Link>
                </div>
            </div>
        </section>
    );
};
