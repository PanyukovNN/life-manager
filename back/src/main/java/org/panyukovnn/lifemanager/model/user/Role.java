package org.panyukovnn.lifemanager.model.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

/**
 * Роль пользователя.
 */
@Data
@Entity
@ToString
@NoArgsConstructor
@Document(collection = "user_role")
public class Role implements GrantedAuthority {

    @Id
    private String id;

    private String name;

    public Role(String name) {
        this.name = name;
    }

    @Override
    public String getAuthority() {
        return getName();
    }
}
