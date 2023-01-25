package yj.project.lala.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import yj.project.lala.application.input.FixedInputService;
import yj.project.lala.application.input.VariableInputService;
import yj.project.lala.application.ledger.FixedExpensesLedgerService;
import yj.project.lala.application.ledger.LedgerView;
import yj.project.lala.domain.category.CategoryGroup;

import java.util.List;

@RestController
@RequestMapping("/api/v1/input")
@RequiredArgsConstructor
public class InputController {
    private final FixedInputService fixedInputService;
    private final VariableInputService variableInputService;
    private final FixedExpensesLedgerService fixedExpensesLedgerService;

    @GetMapping("/income")
    public List<LedgerView> incomeInput(@RequestParam int year, @RequestParam int month) {
        return fixedInputService.getInputs(year, month, CategoryGroup.INCOME);
    }

    @GetMapping("/saving-investment")
    public List<LedgerView> savingInvestmentInput(@RequestParam int year, @RequestParam int month) {
        return fixedInputService.getInputs(year, month, CategoryGroup.SAVING_INVESTMENT);
    }

    @GetMapping("/pension")
    public List<LedgerView> pensionInput(@RequestParam int year, @RequestParam int month) {
        return fixedInputService.getInputs(year, month, CategoryGroup.PENSION);
    }

    @GetMapping("/expenses")
    public List<LedgerView> expensesInput(@RequestParam int year, @RequestParam int month) {
        return fixedExpensesLedgerService.findAll(year, month);
    }

    @GetMapping("/variable")
    public List<LedgerView> findAllVariableLedgers(@RequestParam int year, @RequestParam int month) {
        return variableInputService.findVariableLedgers(year, month);
    }
}
