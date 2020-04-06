
import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Button
} from "reactstrap";

function EquipeNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("");
  const [navbarFixed, setNavbarFixed] = React.useState("");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
        setNavbarFixed("fixed-top");
    } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
        ) {
            setNavbarColor("");
            setNavbarFixed("");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar
      className={classnames(navbarFixed, navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/"
            title="Top Gym Academia"
            tag={Link}
          >
            Top Gym Academia
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink to="/equipe" tag={Link}>
                <i className="fas fa-users" /> Equipe
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/#pricing" tag={Link}>
                <i className="fas fa-wallet" /> Planos
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/#pricing" tag={Link}>
              <i class="fas fa-stopwatch" /> Nossos Horários
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/gallery" tag={Link}>
                <i className="fas fa-images" /> Galeria
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/"
                target="_blank"
                title="Siga-nos no Instagram"
              >
                <i className="fa fa-instagram" />
                <p className="d-lg-none">Instagram</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <Button
                className="btn-round"
                color="success"
                href="#"
                disabled
              >
                Nossa Loja
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default EquipeNavbar;
