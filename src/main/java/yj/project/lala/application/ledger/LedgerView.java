package yj.project.lala.application.ledger;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LedgerView {
    private Long id;
    private Long amount;
    private String memo;
    private Long categoryId;
    private String categoryName;
    private Long subCategoryId;
    private String subCategoryName;
    private Integer year;
    private Integer month;
    private Integer day;
    private String paymentMethod;
}
