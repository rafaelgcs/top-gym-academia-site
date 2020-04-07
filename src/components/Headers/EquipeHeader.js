import React from "react";

// reactstrap components
import {
    Container,
    Row,
    Col
} from "reactstrap";

function EquipeHeader() {
    return (
        <Col md={12} className="page-header section-dark">
            <Row>
                <Col md={6} className="section section-dark text-center">
                    <div className="section section-dark text-center">
                        <Container>
                            <h1 className="title" style={{ color: 'green' }}>Conheça a equipe <br /><span style={{ color: 'green' }}>TOP GYM!</span></h1>
                            <h4 className="title" style={{ color: 'green' }}>Musculação, FitDance, Treinamento Funcional, Zumba, Spinning, Boxe, Jump e Step.</h4>
                            <Row style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                            </Row>
                        </Container>
                    </div>

                </Col>
                <Col className="section-dark d-none d-md-block"
                    style={{
                        backgroundImage:
                            "url(" + require("assets/img/bank/peoples-01.png") + ")",
                        // backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        {/* <img src={{}/> */}
                    </Col>

            </Row>
        </Col>
    );
}

export default EquipeHeader;
