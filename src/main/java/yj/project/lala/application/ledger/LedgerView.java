package yj.project.lala.application.ledger;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class LedgerView {
    private Long id;
    private Long amount;
    private String memo;
    private String ledgerType;
    private String categoryName;
    private String subCategoryName;
    private LocalDate date;
}
