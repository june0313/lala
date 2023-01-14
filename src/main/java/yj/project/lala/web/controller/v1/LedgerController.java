package yj.project.lala.web.controller.v1;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yj.project.lala.application.ledger.LedgerService;
import yj.project.lala.application.ledger.LedgerUpdateRequest;
import yj.project.lala.application.ledger.LedgerView;
import yj.project.lala.domain.ledger.LedgerType;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ledgers")
public class LedgerController {
    private final LedgerService ledgerService;

    @GetMapping
    public List<LedgerView> findAllLedgers() {
        return ledgerService.findAll();
    }

    @GetMapping("/incomes")
    public List<LedgerView> findAllIncomes() {
        return ledgerService.findAllByType(LedgerType.INCOME);
    }

    @GetMapping("/saving-investment")
    public List<LedgerView> findAllSavingAndInvestment() {
        return ledgerService.findAllByType(LedgerType.SAVING_INVESTMENT);
    }

    @GetMapping("/pension")
    public List<LedgerView> findAllPensions() {
        return ledgerService.findAllByType(LedgerType.PENSION);
    }

    @PutMapping
    public LedgerView updateLedger(@RequestBody @Valid LedgerUpdateRequest request) {
        return ledgerService.update(request);
    }

}
