package org.panyukovnn.lifemanager.controller;

import org.springframework.boot.test.autoconfigure.web.servlet.MockMvcBuilderCustomizer;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.setup.ConfigurableMockMvcBuilder;

@Component
class MockMvcCharacterEncodingCustomizer implements MockMvcBuilderCustomizer {
    @Override
    public void customize(ConfigurableMockMvcBuilder<?> builder) {
        builder.alwaysDo(result -> result.getResponse().setCharacterEncoding("UTF-8"));
    }
}
