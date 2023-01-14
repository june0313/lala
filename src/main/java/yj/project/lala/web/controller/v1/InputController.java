package yj.project.lala.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yj.project.lala.application.input.FixedInput;
import yj.project.lala.application.input.FixedInputService;
import yj.project.lala.domain.category.CategoryGroup;

import java.util.List;

@RestController
@RequestMapping("/api/v1/input")
@RequiredArgsConstructor
public class InputController {
    private final FixedInputService fixedInputService;

    @GetMapping("/income")
    public List<FixedInput> incomeInput() {
        return fixedInputService.getInputs(CategoryGroup.INCOME);
    }

    @GetMapping("/saving-investment")
    public List<FixedInput> savingInvestmentInput() {
        return fixedInputService.getInputs(CategoryGroup.SAVING_INVESTMENT);
    }

    @GetMapping("/pension")
    public List<FixedInput> pensionInput() {
        return fixedInputService.getInputs(CategoryGroup.PENSION);
    }

    @GetMapping("/fixed-expenses")
    public List<FixedInput> expensesInput() {
        return fixedInputService.getInputs(CategoryGroup.FIXED_EXPENSES);
    }
}
