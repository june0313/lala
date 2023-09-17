package yj.project.lala.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import yj.project.lala.application.input.InputService;
import yj.project.lala.application.ledger.LedgerView;
import yj.project.lala.domain.category.CategoryType;

import java.util.List;

@RestController
@RequestMapping("/api/v1/input")
@RequiredArgsConstructor
public class InputController {
    private final InputService inputService;

    @GetMapping("/income")
    public List<LedgerView> incomeInput(@RequestParam int year, @RequestParam int month) {
        return inputService.findLedgers(year, month, CategoryType.INCOME);
    }

    @GetMapping("/saving")
    public List<LedgerView> savingInvestmentInput(@RequestParam int year, @RequestParam int month) {
        return inputService.findLedgers(year, month, CategoryType.SAVING);
    }

    @GetMapping("/investment")
    public List<LedgerView> pensionInput(@RequestParam int year, @RequestParam int month) {
        return inputService.findLedgers(year, month, CategoryType.INVESTMENT);
    }

    @GetMapping("/expenses")
    public List<LedgerView> expensesInput(@RequestParam int year, @RequestParam int month) {
        return inputService.findLedgers(year, month, CategoryType.EXPENSES);
    }
}
