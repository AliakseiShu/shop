import React from 'react';
import {useAppSelector} from "../../hook";

import styles from '../../styles/Cart.module.css';

import {AiOutlineMinus} from "@react-icons/all-files/ai/AiOutlineMinus";
import {AiOutlinePlus} from "@react-icons/all-files/ai/AiOutlinePlus";
import {AiOutlineDelete} from "@react-icons/all-files/ai/AiOutlineDelete";

export const Cart = () => {
    const {cart} = useAppSelector(({user}) => user)

    return (
        <section className={styles.cart}>
            <h2 className={styles.title}>Your cart</h2>
            {!cart.length ? (
                <div className={styles.empty}>Here is empty</div>
            ) : (
                <div className={styles.list}>
                    {cart.map((item) => {
                        const {title, category, images, price, id, quantity} = item
                        return <div className={styles.item} key={id}>
                            <div className={styles.image}
                                 style={{backgroundImage: `url(${images[0]})`}}/>
                            <div className={styles.info}>
                                <h3 className={styles.name}>{title}</h3>
                                <div className={styles.category}>{category.name}$</div>
                            </div>
                            <div className={styles.price}>{price}$</div>
                            <div className={styles.quantity}>
                               <div className={styles.minus}>
                                   <div className="icon">
                                       <AiOutlineMinus/>
                                   </div>
                               </div>
                                <span>{quantity}</span>

                                <div className={styles.plus}>
                                    <div className="icon">
                                        <AiOutlinePlus/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.total}>{price * quantity}$</div>
                            <div className="icon">
                                <AiOutlineDelete/>
                            </div>
                        </div>
                    })}
                </div>
            )}
        </section>
    );
};
