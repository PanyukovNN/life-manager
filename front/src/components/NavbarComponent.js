import '../App.css';
import {React} from 'react';
import {Container, Nav, Navbar, Spinner, Button, NavDropdown} from "react-bootstrap";
import {signOut, isLoggedIn, getUser} from "../services/AuthService";
import {LOADING_SPINNER_ID} from "../Constants";

/**
 * Навигационная панель
 *
 * @returns компонент навигационной панели
 */
export const NavbarComponent = () => {

    const auth = isLoggedIn();
    const user = auth ? getUser() : null;

    const renderProfileDropdown = (
        <NavDropdown title={user ? user.username : "undefined"} id="basic-nav-dropdown" align="end" >
            <NavDropdown.Item href="/profile">Профиль</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={signOut}>Выйти</NavDropdown.Item>
        </NavDropdown>
    );

    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="my-2 my-lg-0"
                        navbarScroll>
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/done-tasks">Выполненные</Nav.Link>
                        <Nav.Link href="/categories">Управление разделами</Nav.Link>

                    </Nav>
                    <Nav style={{position: 'absolute', right: '35px'}}>
                        {!auth && <Nav.Link style={{marginLeft: 'auto'}} href="/sign-in">Вход</Nav.Link>}
                        {!auth && <a style={{marginLeft: '20px'}} href="/sign-up">
                                <Button variant="outline-secondary">Регистрация</Button>
                            </a>
                        }
                        {auth && renderProfileDropdown}
                    </Nav>
                </Navbar.Collapse>
                <div className="navbar-spinner" id={LOADING_SPINNER_ID}>
                    <Spinner animation="border" size="sm" variant="secondary" />
                </div>
            </Container>
        </Navbar>
    )
}
