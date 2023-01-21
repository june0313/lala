package yj.project.lala.application.ledger;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LedgerWriteRequest {
    private Long ledgerId;
    private Long amount;
    private String memo;
    private Long categoryId;
    private Long subCategoryId;
    private Integer year;
    private Integer month;
    private Integer day;
}
