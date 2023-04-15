import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hook";

import styles from '../../styles/Cart.module.css';

import {AiOutlineMinus} from "@react-icons/all-files/ai/AiOutlineMinus";
import {AiOutlinePlus} from "@react-icons/all-files/ai/AiOutlinePlus";
import {AiOutlineDelete} from "@react-icons/all-files/ai/AiOutlineDelete";

import {sumBy} from "../../utils/common";
import {IProduct} from "../Products/Products";
import {addItemToCart, removeItemFromCart} from "../../features/user/userSlice";

export const Cart = () => {
    const dispatch = useAppDispatch()
    const {cart} = useAppSelector(({user}) => user)

    const changeQuantity = (item:IProduct, quantity: number) => {
        dispatch(addItemToCart({...item, quantity}))
    }
    const removeCart = (id:number) => {
        dispatch(removeItemFromCart(id))
    }

    return (
        <section className={styles.cart}>
            <h2 className={styles.title}>Your cart</h2>
            {!cart.length ? (
                <div className={styles.empty}>Here is empty</div>
            ) : (
                <React.Fragment>
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
                                    <div className={styles.minus}
                                         onClick={()=>changeQuantity(item, Math.max(1, quantity - 1))}>
                                        <div className="icon">
                                            <AiOutlineMinus/>
                                        </div>
                                    </div>
                                    <span>{quantity}</span>

                                    <div className={styles.plus}
                                         onClick={()=>changeQuantity(item, Math.max(1, quantity + 1))}>
                                        <div className="icon">
                                            <AiOutlinePlus/>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.total}>{price * quantity}$</div>
                                <div className={styles.close}>
                                    <div className="icon" onClick={()=>removeCart(item.id)}>
                                        <AiOutlineDelete/>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.total}>
                            TOTAL PRICE: {" "}
                            <span>
                              {sumBy(cart.map(({price, quantity}) => quantity * price))}$
                            </span>
                        </div>
                        <button className={styles.proceed}>Proceed to checkout</button>
                    </div>
                </React.Fragment>
            )}
        </section>
    );
};
