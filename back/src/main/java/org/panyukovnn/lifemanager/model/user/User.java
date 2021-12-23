package org.panyukovnn.lifemanager.model.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.panyukovnn.lifemanager.model.validator.PasswordMatches;
import org.panyukovnn.lifemanager.model.validator.ValidPassword;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Objects;
import java.util.Set;

/**
 * Пользователь
 */
@Getter
@Setter
@ToString
@PasswordMatches
@NoArgsConstructor
@Document(collection = "usr")
public class User implements UserDetails, Serializable {

    @Id
    private Long id;

    @Email(message = "Некорректный email.")
    @NotBlank(message = "Email не может быть пустым.")
    private String username;

    @ValidPassword
    @NotBlank(message = "Пароль не может быть пустым.")
    private String password;

    private transient String confirmPassword;

    @NotBlank(message = "Имя пользователя не может быть пустым.")
    private String name;

    private String activationCode;

    private LocalDate creationDate;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
