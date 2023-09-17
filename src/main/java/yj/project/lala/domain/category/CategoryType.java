package yj.project.lala.domain.category;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryType {
    INCOME("수입"),
    SAVING("저축"),
    INVESTMENT("투자"),
    EXPENSES("지출"),
    ;

    private final String displayName;
}
