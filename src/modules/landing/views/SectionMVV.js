import React from 'react';

// reactstrap components
import {
    Container,
    Row,
    Col
} from "reactstrap";

const SectionMVV = () => {
    return (
        <div className="section section-dark text-center">
            <Container>
                <Row>
                    <Col className="ml-auto mr-auto" md="9">
                        <h2 className="title">TOP GYM ACADEMIA</h2>
                        <h5 className="description">
                            A Top Gym Academia surgiu no mercado em 2012, oferecendo ao público os serviços de musculação, aula de dança, treinamento funcional, spinning, boxe, jump e step.
                        </h5>
                        <h5 className="description">
                            Localizada no bairro de Pau da Lima, seu principal objetivo sempre foi ser a maior referência do ramo fitness na região. Em 2019 a Top Gym passou por uma grande reformulação, transferindo suas instalações para um novo ponto comercial, porém permanecendo na mesma localidade.
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <div className="info">
                            <div className="icon icon-success">
                                <i className="fas fa-mountain" />
                            </div>
                            <div className="description">
                                <h4 className="info-title">Missão</h4>
                                <p className="description">
                                    Estimular a prática de atividade física, promovendo bem estar, aumento da autoestima e possivelmente uma maior qualidade de vida em prol da satisfação dos nossos clientes.
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="info">
                            <div className="icon icon-success">
                                <i class="far fa-eye" style={{fontSize:60}} />
                            </div>
                            <div className="description">
                                <h4 className="info-title">Visão</h4>
                                <p className="description">
                                    Ser a referência em academia na região, proporcionando aos nossos clientes, colaboradores e parceiros um ambiente agradável, serviços de qualidade e excelência em atendimento.
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="info">
                            <div className="icon icon-success">
                                <i class="fas fa-star" />
                            </div>
                            <div className="description">
                                <h4 className="info-title">Valores</h4>
                                <p className="description">
                                    <ul>
                                        <li>Satisfação do cliente;</li>
                                        <li>Foco em resultados;</li>
                                        <li>Valorização e respeito humano;</li>
                                        <li>Ética e profissionalismo.</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default SectionMVV;