package yj.project.lala.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import yj.project.lala.application.input.FixedInput;
import yj.project.lala.application.input.FixedInputService;
import yj.project.lala.application.input.VariableInput;
import yj.project.lala.application.input.VariableInputService;
import yj.project.lala.domain.category.CategoryGroup;

import java.util.List;

@RestController
@RequestMapping("/api/v1/input")
@RequiredArgsConstructor
public class InputController {
    private final FixedInputService fixedInputService;
    private final VariableInputService variableInputService;

    @GetMapping("/income")
    public List<FixedInput> incomeInput(@RequestParam int year, @RequestParam int month) {
        return fixedInputService.getInputs(year, month, CategoryGroup.INCOME);
    }

    @GetMapping("/saving-investment")
    public List<FixedInput> savingInvestmentInput(@RequestParam int year, @RequestParam int month) {
        return fixedInputService.getInputs(year, month, CategoryGroup.SAVING_INVESTMENT);
    }

    @GetMapping("/pension")
    public List<FixedInput> pensionInput(@RequestParam int year, @RequestParam int month) {
        return fixedInputService.getInputs(year, month, CategoryGroup.PENSION);
    }

    @GetMapping("/expenses")
    public List<FixedInput> expensesInput(@RequestParam int year, @RequestParam int month) {
        return fixedInputService.getInputs(year, month, CategoryGroup.EXPENSES);
    }

    @GetMapping("/variable")
    public List<VariableInput> findAllVariableLedgers(@RequestParam int year, @RequestParam int month) {
        return variableInputService.findVariableLedgers(year, month);
    }
}
