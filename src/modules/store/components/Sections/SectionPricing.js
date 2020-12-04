import React from 'react';
import { Box, CssBaseline, Container } from '@material-ui/core'
import { Button as RSButton, Row, Col } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles'
import Dinero from 'dinero.js'
const defaultProductImage = require('modules/shared/assets/img/default-product.png')

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    bg: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper,
    },
    section: {
        padding: '70px 0',
        position: 'relative',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper)
    },
    distakedText: { color: 'green', fontWeight: 'bold' },
    title: {
        color: theme.palette.getContrastText(theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper),
        marginTop: 30,
        marginBottom: 25,
        minHeight: 32,
        textDecoration: 'none'
    }

}));

const SectionPricing = (props) => {
    const classes = useStyles();
    const { item } = props
    const getPrice = (valor, valor_p = 0) => {
        let str = (valor_p > 0 ? valor_p : valor).toString()
        let hasDot = str.indexOf('.')
        let hasOneAfter = str.split('.')

        str = str.replaceAll(',', '')
        str = str.replaceAll('.', '')
        if (!(hasDot >= 0)) {
            str = `${str}00`
        }else if(hasOneAfter.length > 1){
            if(hasOneAfter[hasOneAfter.length - 1].length == 1){
                str = `${str}0`
            }
        }
        return (Dinero({ amount: parseInt(str), currency: 'BRL' }).toFormat('$0.00')).replace('.', ',')
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.section}>
                <Container maxWidth="lg" component="main" className={classes.bg}>
                    <Row>
                        <Col md={6}>
                            <h2 style={{ fontSize: 28, marginBottom: -25 }}>{item.categoria.nome}</h2>
                            <h2 className={classes.title} style={{ fontSize: 60 }}>{item.nome}</h2>
                            <h2 className={classes.title} style={{ fontSize: 70 }}><span className={classes.distakedText}>{getPrice(item.valor, item.valor_promocional)}</span></h2>
                            {/* <p className="description">
                                Textinho breve sobre os eventos
                            </p> */}
                            <Box>
                                <RSButton
                                    style={{ padding: '40 15' }}
                                    className="btn-round"
                                    color="success"
                                    href="tel:71981213612"
                                >
                                    COMPRE JÁ!
                                </RSButton>
                            </Box>
                        </Col>
                        <Col md={6}>
                            {/* <Paper elevation={5} style={{borderRadius: 10}}> */}

                            {/* <img width="100%" style={{borderRadius: 10}} src={imagemPlano} /> */}
                            <img alt="product_image" className="d-none d-md-block" width="80%" src={item.images.length > 0 ? item.images[0].image_url : defaultProductImage} />
                            {/* </Paper> */}

                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default SectionPricing;