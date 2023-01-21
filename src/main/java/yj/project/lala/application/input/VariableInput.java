package yj.project.lala.application.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class VariableInput {
    private Long ledgerId;
    private Long categoryId;
    private String categoryName;
    private Long subCategoryId;
    private String subCategoryName;
    private String memo;
    private Long amount;
    private Integer dayOfMonth;
    private String paymentMethod;
}
