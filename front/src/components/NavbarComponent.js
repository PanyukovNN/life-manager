import '../App.css';
import {React} from 'react';
import {Container, Nav, Navbar, Spinner, Button} from "react-bootstrap";
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
                        <Nav style={{position: 'absolute', right: '35px'}}>
                            {!auth && <Nav.Link style={{marginLeft: 'auto'}} href="/sign-in">Вход</Nav.Link>}
                            {!auth && <a style={{marginLeft: '20px'}} href="/sign-up">
                                    <Button variant="outline-secondary">Регистрация</Button>
                                </a>
                            }
                            {auth && <Nav.Link onClick={AuthService.signOut}>Выйти</Nav.Link>}
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
