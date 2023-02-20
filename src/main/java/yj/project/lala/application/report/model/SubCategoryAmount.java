package yj.project.lala.application.report.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SubCategoryAmount {
    private String subCategoryName;
    private Long amount;
}
