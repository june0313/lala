package yj.project.lala.domain.category;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryType {
    INCOME("수입"),
    SAVING_INVESTMENT("저축, 투자"),
    PENSION("연금, 노후"),
    EXPENSES("지출"),
    ;

    private final String displayName;
}
