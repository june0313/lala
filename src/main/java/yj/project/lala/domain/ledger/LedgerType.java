package yj.project.lala.domain.ledger;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum LedgerType {
    INCOME("수입"),
    SAVING_INVESTMENT("저축_투자"),
    PENSION("연금_노후"),
    FIXED_EXPENSES("고정 지출"),
    VARIABLE_EXPENSES("비정기 지출"),
    ;

    private final String displayName;
}
