import '../App.css';
import {React} from 'react';
import {Navbar, Container, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";

/**
 * Навигационная панель
 *
 * @returns {*} компонент навигационной панели
 */
export const NavbarComponent = () => {

    return (
        <>
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="my-2 my-lg-0"
                            navbarScroll>
                            <Nav.Link href="/tasks">Задачи</Nav.Link>
                            <Nav.Link href="/categories">Управление разделами</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
