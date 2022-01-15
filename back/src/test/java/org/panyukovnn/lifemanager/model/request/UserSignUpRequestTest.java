package org.panyukovnn.lifemanager.model.request;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Тесты сущности запроса {@link UserSignUpRequest}
 */
public class UserSignUpRequestTest {

    public static final String ID = "id";
    public static final String USERNAME = "bob";
    public static final String EMAIL = "bob@domain.com";
    public static final String PWD = "qwerty12";

    private static final String TOO_SHORT_PWD = "a23";
    private static final String TOO_LONG_PWD = "a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000)";
    private static final String INSUFFICIENT_DIGIT_PWD = "qwertyqwe";
    private static final String INSUFFICIENT_ALPHABETICAL_PWD = "12345678";
    private static final String ILLEGAL_WHITESPACE_PWD = "qwer ty12";

    private static final String PWD_TOO_SHORT_ERROR_MSG = "Длина пароля должна быть не менее 8 символов";
    private static final String PWD_TOO_LONG_ERROR_MSG = "Длина пароля не должна превышать 100 символов";
    private static final String PWD_INSUFFICIENT_DIGIT_ERROR_MSG = "Пароль должен содержать как минимум 1 цифру";
    private static final String PWD_INSUFFICIENT_ALPHABETICAL_ERROR_MSG = "Пароль должен содержать как минимум 1 букву";
    private static final String PWD_ILLEGAL_WHITESPACE_ERROR_MSG = "Пароль не может содержать пробелы";

    private static Validator validator;

    @BeforeAll
    public static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    public void should_allBasicErrorMessages_when_allFieldsEmpty() {
        UserSignUpRequest signUpRequest = createUserSignUpRequest(null, null, null, null, null);

        Set<ConstraintViolation<UserSignUpRequest>> violations = validator.validate(signUpRequest);
        List<String> errorMessages = convertViolationsToMessageList(violations);

        assertThat(errorMessages)
                .containsExactlyInAnyOrder(
                        BLANK_USER_NAME_ERROR_MSG,
                        BLANK_EMAIL_ERROR_MSG,
                        BLANK_PASSWORD_ERROR_MSG,
                        WRONG_PASSWORD_ERROR_MSG);
    }

    @Test
    public void should_invalidPassword_when_passwordTooShort() {
        UserSignUpRequest signUpRequest = createUserSignUpRequest(
                ID, USERNAME, EMAIL, TOO_SHORT_PWD, TOO_SHORT_PWD);

        Set<ConstraintViolation<UserSignUpRequest>> violations = validator.validate(signUpRequest);
        List<String> errorMessages = convertViolationsToMessageList(violations);

        assertThat(errorMessages)
                .containsExactlyInAnyOrder(
                        PWD_TOO_SHORT_ERROR_MSG);
    }

    @Test
    public void should_invalidPassword_when_passwordTooLong() {
        UserSignUpRequest signUpRequest = createUserSignUpRequest(
                ID, USERNAME, EMAIL, TOO_LONG_PWD, TOO_LONG_PWD);

        Set<ConstraintViolation<UserSignUpRequest>> violations = validator.validate(signUpRequest);
        List<String> errorMessages = convertViolationsToMessageList(violations);

        assertThat(errorMessages)
                .containsExactlyInAnyOrder(
                        PWD_TOO_LONG_ERROR_MSG);
    }

    @Test
    public void should_invalidPassword_when_insufficientDigitPassword() {
        UserSignUpRequest signUpRequest = createUserSignUpRequest(
                ID, USERNAME, EMAIL, INSUFFICIENT_DIGIT_PWD, INSUFFICIENT_DIGIT_PWD);

        Set<ConstraintViolation<UserSignUpRequest>> violations = validator.validate(signUpRequest);
        List<String> errorMessages = convertViolationsToMessageList(violations);

        assertThat(errorMessages)
                .containsExactlyInAnyOrder(
                        PWD_INSUFFICIENT_DIGIT_ERROR_MSG);
    }

    @Test
    public void should_invalidPassword_when_insufficientAlphabeticalPassword() {
        UserSignUpRequest signUpRequest = createUserSignUpRequest(
                ID, USERNAME, EMAIL, INSUFFICIENT_ALPHABETICAL_PWD, INSUFFICIENT_ALPHABETICAL_PWD);

        Set<ConstraintViolation<UserSignUpRequest>> violations = validator.validate(signUpRequest);
        List<String> errorMessages = convertViolationsToMessageList(violations);

        assertThat(errorMessages)
                .containsExactlyInAnyOrder(
                        PWD_INSUFFICIENT_ALPHABETICAL_ERROR_MSG);
    }

    @Test
    public void should_invalidPassword_when_illegalWhitespacePassword() {
        UserSignUpRequest signUpRequest = createUserSignUpRequest(
                ID, USERNAME, EMAIL, ILLEGAL_WHITESPACE_PWD, ILLEGAL_WHITESPACE_PWD);

        Set<ConstraintViolation<UserSignUpRequest>> violations = validator.validate(signUpRequest);
        List<String> errorMessages = convertViolationsToMessageList(violations);

        assertThat(errorMessages)
                .containsExactlyInAnyOrder(
                        PWD_ILLEGAL_WHITESPACE_ERROR_MSG);
    }

    @Test
    public void should_invalidPassword_when_passwordsDoNotMatch() {
        UserSignUpRequest signUpRequest = createUserSignUpRequest(
                ID, USERNAME, EMAIL, PWD, PWD + "test");

        Set<ConstraintViolation<UserSignUpRequest>> violations = validator.validate(signUpRequest);
        List<String> errorMessages = convertViolationsToMessageList(violations);

        assertThat(errorMessages)
                .containsExactlyInAnyOrder(
                        PASSWORDS_DO_NOT_MATCH_ERROR_MSG);
    }

    private List<String> convertViolationsToMessageList(Set<ConstraintViolation<UserSignUpRequest>> violations) {
        return violations
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.toList());
    }

    private UserSignUpRequest createUserSignUpRequest(String id, String username, String email, String password, String confirmPassword) {
        UserSignUpRequest request = new UserSignUpRequest();
        request.setId(id);
        request.setUsername(username);
        request.setEmail(email);
        request.setPassword(password);
        request.setConfirmPassword(confirmPassword);

        return request;
    }
}
