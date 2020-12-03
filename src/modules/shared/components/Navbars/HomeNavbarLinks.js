/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import Button from "../CustomButtons/Button";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle";

const useStyles = makeStyles(styles);

const HomeNavbarLinks = (props) => {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            {/* <ListItem className={classes.listItem}>
                <Button
                    href="#"
                    color="transparent"
                    //   target="_blank"
                    disabled
                    className={classes.navLink}
                >
                    <CloudDownload className={classes.icons} /> Download
                </Button>
            </ListItem> */}
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="nossa-equipe"
                    title="Conheça nossa equipe"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{ tooltip: classes.tooltip }}
                >
                    <Link
                        to="/equipe"
                        color="transparent"
                        className={classes.navLink}
                    >
                        <i className={classes.socialIcons + " fas fa-users"} />
                        Equipe
                    </Link>
                </Tooltip>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="to-pricing"
                    title="Conheça nosso plano mais recente"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{ tooltip: classes.tooltip }}
                >
                    <ScrollLink
                        to="pricing"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        // onClick={toggleNavbarCollapse}
                    >
                        <Button
                            color="transparent"
                            className={classes.navLink}
                        >
                            <i className={classes.socialIcons + " fas fa-money-check-alt"} />
                        Nossos Planos
                        </Button>
                    </ScrollLink>
                </Tooltip>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="our-gallery"
                    title="Conheça nossa galeria"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{ tooltip: classes.tooltip }}
                >
                    <Link
                        to="/gallery"
                        color="transparent"
                        className={classes.navLink}
                    >
                        <i className={classes.socialIcons + " far fa-images"} />
                        Galeria
                    </Link>
                </Tooltip>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="instagram-facebook"
                    title="Encontre-nos no facebook"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{ tooltip: classes.tooltip }}
                >
                    <Button
                        color="transparent"
                        href="https://www.facebook.com/TPGAcademia"
                        target="_blank"
                        className={classes.navLink}
                    >
                        <i className={classes.socialIcons + " fab fa-facebook"} />
                        <span className="d-block d-md-none">Facebook</span>
                    </Button>
                </Tooltip>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="instagram-tooltip"
                    title="Siga-nos no instagram"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{ tooltip: classes.tooltip }}
                >
                    <Button
                        color="transparent"
                        href="https://www.instagram.com/topgymacademia"
                        target="_blank"
                        className={classes.navLink}
                    >
                        <i className={classes.socialIcons + " fab fa-instagram"} />
                        <span className="d-block d-md-none">Instagram</span>
                    </Button>
                </Tooltip>
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText="Mais..."
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    buttonIcon={Apps}
                    dropdownList={[
                        <Link to="/loja" className={classes.dropdownLink}>
                            Nossa Loja
                        </Link>,
                        <a
                            href="tel:71981213612"
                            className={classes.dropdownLink}
                        >
                            Entre em contato
                        </a>
                    ]}
                />
            </ListItem>
        </List>
    );
}

export default HomeNavbarLinks;