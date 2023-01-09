package yj.project.lala.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yj.project.lala.application.input.Input;
import yj.project.lala.application.input.InputService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/input")
@RequiredArgsConstructor
public class InputController {
    private final InputService inputService;

    @GetMapping("/income")
    public List<Input> incomeInput() {
        return inputService.getInputs();
    }
}
