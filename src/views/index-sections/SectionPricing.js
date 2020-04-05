import React from 'react';
import { Box,Button, Card, CardActions, CardContent, CardHeader, CssBaseline, Grid, Typography, Container, Paper } from '@material-ui/core';
import { Button as RSButton, Row, Col } from 'reactstrap';
import StarIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    title: {
        fontFamily: ["Montserrat", "Helvetica", "Arial", "sans-serif"],
        align: 'center',
        textAlign: 'center',
        paddingBottom: 25,
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {

    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

const tiers = [
    {
        title: 'Diária',
        price: '0',
        description: ['Descrição do produto'],
        buttonText: 'Fale Conosco',
        buttonVariant: 'outlined',
    },
    {
        title: 'Mensal',
        subheader: 'Mais Popular',
        price: '15',
        description: [
            'Descrição do produto'
        ],
        buttonText: 'Fale Conosco',
        buttonVariant: 'contained',
    },
    {
        title: 'Anual',
        price: '30',
        description: ['Descrição do produto'],
        buttonText: 'Fale Conosco',
        buttonVariant: 'outlined',
    },
];

const tier = {
    title: 'Anual',
    price: '30',
    description: ['Descrição do produto'],
    buttonText: 'Fale Conosco',
    buttonVariant: 'outlined',
};

const imagemPlano = require("assets/img/bg-header-01.jpg");

const SectionPricing = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <div className="section section-pricing">
                <Container maxWidth="lg" component="main" className={classes.heroContent}>
                    <Row>
                        <Col md={6}>
                            <h2 style={{ fontSize: 28, marginBottom: -25 }}>Seja nosso aluno, matricule-se já!</h2>
                            <h2 className="title" style={{ fontSize: 60 }}>Faça parte da linha <span style={{ color: 'green', fontWeight: 'bold' }}>TOP SLIM!</span></h2>
                            <h2 className="title" style={{ fontSize: 70 }}>R$ 140,00<span style={{ fontSize: 20 }}>/MÊS</span></h2>
                            {/* <p className="description">
                                Textinho breve sobre os eventos
                            </p> */}
                            <Box>
                                <RSButton
                                    style={{paddingLeft: 40, paddingRight: 40, paddingTop: 15, paddingBottom: 15 }}
                                    className="btn-round"
                                    color="success"
                                    href="#"
                                >
                                    COMPRE JÁ!
                                </RSButton>
                            </Box>
                        </Col>
                        <Col md={6}>
                            {/* <Paper elevation={5} style={{borderRadius: 10}}> */}

                            {/* <img width="100%" style={{borderRadius: 10}} src={imagemPlano} /> */}
                            <img className="d-none d-md-block" width="100%" src="https://blog.queimadiaria.com/wp-content/uploads/2016/04/alongamento-mulher-alongando-pernas-e-bracos-barakat.jpg" />
                            {/* </Paper> */}

                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default SectionPricing;