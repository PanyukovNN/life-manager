import '../App.css';
import {React} from 'react';
import {Container, Nav, Navbar, Spinner} from "react-bootstrap";
import AuthService from "../services/AuthService";

/**
 * Навигационная панель
 *
 * @param spinnerCall флаг показа спиннера загрузки
 * @returns {*} компонент навигационной панели
 */
export const NavbarComponent = ({spinnerCall}) => {

    let auth = AuthService.isLoggedIn();

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
                        <Nav style={{position: 'absolute', right: '20px'}}>
                            {!auth && <Nav.Link style={{marginLeft: 'auto'}} href="/sign-in">Вход</Nav.Link>}
                            {auth && <Nav.Link onClick={AuthService.logout}>Выйти</Nav.Link>}
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
