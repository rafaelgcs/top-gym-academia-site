/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import {Link} from 'react-router-dom';
// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from 'reactstrap';

// core components

const SectionSocial = () => {
  return (
    <>
      <div className="section">
        <Container className="text-center">
          <Row className="text-center upgrade-pro">
            <Col className="ml-auto mr-auto" md="8">
              <h2 className="title">Interessado(a)?</h2>
              {/* <p className="description">
                We're going to launch{" "}
                <a className="text-danger" href="#pablo" disabled>
                  Paper Kit PRO React in a few weeks
                </a>
                . It will have a huge number of components, sections and example
                pages.
              </p> */}
            </Col>
          </Row>
          <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
              <h3>Entre em contato conosco!</h3>
            </Col>
            <Col className="text-center" lg="8" md="12">
              <Button
                className="twitter-sharrre btn-round"
                color="success"
                href="tel:71981213612"
                id="telto-tooltip"
                // onClick={e => e.preventDefault()}
              >
                <i className="fa fa-phone" /> Telefone
              </Button>
              <UncontrolledTooltip delay={0} target="telto-tooltip">
                Telefone
              </UncontrolledTooltip>
              <Button
                className="sharrre btn-round ml-2"
                color="danger"
                href="https://instagram.com/"
                target="_blank"
                id="instagram-tooltip"
              >
                <i className="fa fa-instagram" /> Instagram
              </Button>
              <UncontrolledTooltip delay={0} target="instagram-tooltip">
                Siga-nos no Instagram!
              </UncontrolledTooltip>
              <Button
                className="linkedin-sharrre btn-round  ml-2"
                color="success"
                href="https://api.whatsapp.com/send?phone=5571981213612"
                id="whatsapp-tooltip-button"
                target="_blank"
                // onClick={e => e.preventDefault()}
              >
                <i className="fa fa-whatsapp" /> Whatsapp
              </Button>
              <UncontrolledTooltip delay={0} target="whatsapp-tooltip-button">
                Whatsapp
              </UncontrolledTooltip>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionSocial;
