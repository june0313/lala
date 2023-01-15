package yj.project.lala.web.controller.v1;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yj.project.lala.application.ledger.LedgerService;
import yj.project.lala.application.ledger.LedgerView;
import yj.project.lala.application.ledger.LedgerWriteRequest;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ledgers")
public class LedgerController {
    private final LedgerService ledgerService;

    @GetMapping
    public List<LedgerView> findAllLedgers(@RequestParam int year, @RequestParam int month) {
        return ledgerService.findAll(year, month);
    }

    @PostMapping
    public LedgerView writeLedger(@RequestBody @Valid LedgerWriteRequest request) {
        return ledgerService.write(request);
    }

}
