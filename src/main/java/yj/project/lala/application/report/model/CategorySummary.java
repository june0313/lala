package yj.project.lala.application.report.model;

import lombok.Builder;
import lombok.Getter;
import yj.project.lala.domain.category.CategoryGroup;

import java.util.List;

@Getter
@Builder
public class CategorySummary {
    private CategoryGroup categoryGroup;
    private String categoryName;
    private List<SubCategoryAmount> subCategoryAmounts;

    public Long getTotalAmount() {
        return subCategoryAmounts.stream()
                .mapToLong(SubCategoryAmount::getAmount)
                .sum();
    }
}
