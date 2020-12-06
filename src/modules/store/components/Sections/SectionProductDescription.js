import React, { useEffect } from 'react';
import { CssBaseline, Container } from '@material-ui/core'
import { Row, Col } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles'
import EditorJs from 'react-editor-js'
import { EDITOR_JS_TOOLS } from 'modules/shared/tools/editorJS'

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
    }
}));

const SectionProductDescription = (props) => {
    const classes = useStyles()
    const { descricao } = props

    useEffect(() => {

    })
    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.section}>
                <Container maxWidth="lg" component="main" className={classes.bg}>
                    <Row>
                        <Col md={12}>
                            {
                                descricao != null &&
                                <EditorJs readOnly={true} data={JSON.parse(descricao)} tools={EDITOR_JS_TOOLS} />
                            }
                        </Col>
                    </Row>
                </Container>
            </div>

        </React.Fragment>
    );
}

export default SectionProductDescription;