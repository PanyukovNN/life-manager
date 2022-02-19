package org.panyukovnn.lifemanager.model.validator;

import io.micrometer.core.instrument.util.StringUtils;
import org.panyukovnn.lifemanager.exception.LifeManagerException;
import org.passay.*;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;
import java.util.Properties;

import static org.panyukovnn.lifemanager.model.Constants.RESOURCE_FILE_NOT_FOUND_ERROR_MSG;

/**
 * Валидатор паролей.
 */
public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {

	private static final String PASSWORD_VALIDATION_MESSAGES_PROPERTIES_FILE = "password-validation-messages.properties";

	@Override
	public boolean isValid(String password, ConstraintValidatorContext context) {
		if (StringUtils.isBlank(password)) {
			return false;
		}

		MessageResolver messageResolver = loadValidationErrorMessages();

		PasswordValidator validator = new PasswordValidator(
//				messageResolver,
				List.of(new LengthRule(8, 100),
						new CharacterRule(EnglishCharacterData.Digit, 1),
						new CharacterRule(EnglishCharacterData.Alphabetical, 1),
						new WhitespaceRule()
				));

		RuleResult result = validator.validate(new PasswordData(password));

		if (result.isValid()) {
			return true;
		}

		List<String> messages = validator.getMessages(result);

		String messageTemplate = String.join(",", messages);
		context.buildConstraintViolationWithTemplate(messageTemplate)
				.addConstraintViolation()
				.disableDefaultConstraintViolation();

		return false;
	}

	/**
	 * Загружаются собственные текстовки сообщений из файла ресурсов
	 *
	 * @return менеджер сообщений
	 */
	private MessageResolver loadValidationErrorMessages() {
//		URL resource = this.getClass().getClassLoader().getResource(PASSWORD_VALIDATION_MESSAGES_PROPERTIES_FILE);
//		Objects.requireNonNull(resource, RESOURCE_FILE_NOT_FOUND_ERROR_MSG + PASSWORD_VALIDATION_MESSAGES_PROPERTIES_FILE);
//
//		try (InputStream is = new FileInputStream(resource.getPath());
//			 InputStreamReader isr = new InputStreamReader(is, StandardCharsets.UTF_8)) {
//			Properties props = new Properties();
//			props.load(isr);
//
//			return new PropertiesMessageResolver(props);
//		} catch (IOException e) {
//			throw new LifeManagerException(e.getMessage(), e);
//		}
		return null;
	}
}
