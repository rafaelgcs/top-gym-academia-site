import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

const DefaultFooter = () => {
    return (
        <footer className="footer section-dark footer-dark">
            <Container>
                <Row>
                    <div className="credits ml-auto">
                        <span className="copyright">
                            © {new Date().getFullYear()}, feito com{" "}
                            <i className="fa fa-heart heart" style={{color:"green"}} /> por <a href="https://ejcet.com.br" style={{color:"green"}}>EJC&T</a>
                        </span>
                    </div>
                </Row>
            </Container>
        </footer>
    );
}

export default DefaultFooter;
