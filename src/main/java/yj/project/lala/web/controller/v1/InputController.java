package yj.project.lala.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yj.project.lala.application.input.Input;
import yj.project.lala.application.input.InputService;
import yj.project.lala.domain.category.CategoryGroup;

import java.util.List;

@RestController
@RequestMapping("/api/v1/input")
@RequiredArgsConstructor
public class InputController {
    private final InputService inputService;

    @GetMapping("/income")
    public List<Input> incomeInput() {
        return inputService.getInputs(CategoryGroup.INCOME);
    }

    @GetMapping("/saving-investment")
    public List<Input> savingInvestmentInput() {
        return inputService.getInputs(CategoryGroup.SAVING_INVESTMENT);
    }

    @GetMapping("/pension")
    public List<Input> pensionInput() {
        return inputService.getInputs(CategoryGroup.PENSION);
    }

    @GetMapping("/expenses")
    public List<Input> expensesInput() {
        return inputService.getInputs(CategoryGroup.EXPENSES);
    }
}
