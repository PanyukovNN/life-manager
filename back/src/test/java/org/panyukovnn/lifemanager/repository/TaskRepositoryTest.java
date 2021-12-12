package org.panyukovnn.lifemanager.repository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.panyukovnn.lifemanager.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@DataJpaTest
@Transactional(propagation = Propagation.NOT_SUPPORTED)
public class TaskRepositoryTest {

    private static final String TEST_ID = "TEST_ID";
    private static final String TEST_ID_2 = "TEST_ID_2";
    private static final int TEST_PRIORITY = 15;
    private static final int TEST_PRIORITY_2 = 14;
    private static final String TEST_DESCRIPTION = "TEST_DESCRIPTION";
    private static final String TEST_DESCRIPTION_2 = "TEST_DESCRIPTION_2";

    @Autowired
    private TaskRepository taskRepository;

    @Test
    public void test() {
        Task task = new Task();
        task.setId("1234");

        taskRepository.save(task);
    }
}

