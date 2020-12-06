import React from 'react';
import { Box, CssBaseline, Container, Grid } from '@material-ui/core'
import { Button as RSButton, Row, Col } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab';

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

const SectionPrice = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.section}>
                <Container maxWidth="lg" component="main" className={classes.bg}>
                    <Row>
                        <Col md={6}>
                            <h2 style={{ fontSize: 28, marginBottom: -25 }}><Skeleton /></h2>
                            <h2 className={classes.title} style={{ fontSize: 60 }}><Skeleton /></h2>
                            <h2 className={classes.title} style={{ fontSize: 70 }}><span className={classes.distakedText}><Skeleton /></span></h2>
                            <div className="d-block d-md-none mb-2" style={{ height: 200, borderRadius: 15 }}>
                                <Skeleton height={'100%'} />
                            </div>
                            <Grid container lg={12} md={12} xs={12}>
                                <Grid item lg={5} md={5} xs={12}>
                                    <Skeleton />
                                </Grid>
                            </Grid>
                        </Col>
                        <Col md={6}>
                            <Skeleton height={'100%'} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default SectionPrice;