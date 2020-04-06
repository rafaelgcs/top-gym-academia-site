import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

import { Box } from '@material-ui/core';

// core components
import { Link as ScrollLink } from "react-scroll";

function EquipeHeader() {
    return (
        <div style={{ maxWidth: '100%' }}>
            <Container>

                <Row>
                    <Col md={6} className="page-header section-dark"
                        style={{
                            backgroundImage:
                                "url(" + require("assets/img/bg-header-02.webp") + ")",
                            backgroundSize: 'cover',
                        }}>

                    </Col>
                    <Col md={6} style={{ backgroundColor: 'white' }}>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default EquipeHeader;
