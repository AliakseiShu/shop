import React from 'react';
import {Link} from "react-router-dom";

import styles from '../../styles/Footer.module.css';
import {ROUTES} from "../../utils/routes";

import LOGO from "../../images/logo.svg";
import {FaInstagram} from "@react-icons/all-files/fa/FaInstagram";
import {FaFacebook} from "@react-icons/all-files/fa/FaFacebook";
import {FaYoutube} from "@react-icons/all-files/fa/FaYoutube";

export const Footer = () => {
    return (
        <section className={styles.footer}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="LOGO"/>
                </Link>
            </div>
            <div className={styles.rights}>
                Developed by {""}
                <a href="https://aliakseishu.github.io/portfolio/"
                   target="_blank"
                   rel="noreferrer"
                >
                    Aliksei Shulha
                </a>
            </div>
            <div className={styles.socials}>
                <a href="https://www.instagram.com/"
                   target="_blank"
                   rel="noreferrer"
                >
                    <FaInstagram/>
                </a>
                <a href="https://www.facebook.com/"
                   target="_blank"
                   rel="noreferrer"
                >
                    <FaFacebook/>
                </a>
                <a href="https://www.youtube.com/"
                   target="_blank"
                   rel="noreferrer"
                >
                    <FaYoutube/>
                </a>
            </div>
        </section>
    );
};

