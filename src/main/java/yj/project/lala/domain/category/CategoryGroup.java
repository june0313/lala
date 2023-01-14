package yj.project.lala.domain.category;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryGroup {
    INCOME("수입"),
    SAVING_INVESTMENT("저축, 투자"),
    PENSION("연금, 노후"),
    FIXED_EXPENSES("고정 지출"),
    VARIABLE_EXPENSES("변동 지출"),
    ;

    private final String displayName;
}
