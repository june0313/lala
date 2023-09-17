package yj.project.lala.application.report.model;

import lombok.Builder;
import lombok.Getter;
import yj.project.lala.domain.category.CategoryType;

import java.util.List;

@Getter
@Builder
public class CategorySummary {
    private CategoryType categoryType;
    private String categoryName;
    private List<SubCategorySummary> subCategorySummaries;

    public Long getTotalAmount() {
        return subCategorySummaries.stream()
                .mapToLong(SubCategorySummary::getAmount)
                .sum();
    }
}
