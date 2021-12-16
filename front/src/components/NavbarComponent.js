import '../App.css';
import {React, useEffect} from 'react';
import {Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Spinner} from "react-bootstrap";

/**
 * Навигационная панель
 *
 * @returns {*} компонент навигационной панели
 */
export const NavbarComponent = ({spinnerCall}) => {

    return (
        <>
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="my-2 my-lg-0"
                            navbarScroll>
                            <Nav.Link href="/">Задачи</Nav.Link>
                            <Nav.Link href="/categories">Управление разделами</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    {spinnerCall ? <Spinner animation="border" size="sm" variant="secondary" /> : ''}
                </Container>
            </Navbar>
        </>
    )
}
