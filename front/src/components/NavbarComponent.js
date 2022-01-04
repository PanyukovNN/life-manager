import '../App.css';
import {React} from 'react';
import {Container, Nav, Navbar, Spinner} from "react-bootstrap";
import {LoadingPage} from "../pages/LoadingPage";

/**
 * Навигационная панель
 *
 * @param spinnerCall флаг показа спиннера загрузки
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
                            <Nav.Link href="/sign-up">Регистрация</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div className="navbar-spinner">
                        {spinnerCall ? <Spinner animation="border" size="sm" variant="secondary" /> : ''}
                    </div>
                </Container>
            </Navbar>
        </>
    )
}
