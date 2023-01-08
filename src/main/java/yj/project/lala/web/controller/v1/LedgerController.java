package yj.project.lala.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yj.project.lala.application.ledger.LedgerService;
import yj.project.lala.application.ledger.LedgerView;
import yj.project.lala.domain.ledger.LedgerType;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class LedgerController {
    private final LedgerService ledgerService;

    @GetMapping("/ledgers")
    public List<LedgerView> findAllLedgers() {
        return ledgerService.findAll();
    }

    @GetMapping("/ledgers/incomes")
    public List<LedgerView> findAllIncomes() {
        return ledgerService.findAllByType(LedgerType.INCOME);
    }

    @GetMapping("/ledgers/saving-investment")
    public List<LedgerView> findAllSavingAndInvestment() {
        return ledgerService.findAllByType(LedgerType.SAVING_INVESTMENT);
    }

    @GetMapping("/ledgers/pension")
    public List<LedgerView> findAllPensions() {
        return ledgerService.findAllByType(LedgerType.PENSION);
    }

}
