package yj.project.lala.application.ledger;

import lombok.Getter;
import lombok.Setter;
import yj.project.lala.domain.ledger.LedgerType;

import java.time.LocalDate;

@Getter
@Setter
public class LedgerWriteRequest {
    private LocalDate date;
    private Long amount;
    private String memo;
    private LedgerType ledgerType;
    private Long categoryId;
    private Long subCategoryId;
}
