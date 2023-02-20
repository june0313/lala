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
    private List<SubCategorySummary> subCategorySummaries;

    public Long getTotalAmount() {
        return subCategorySummaries.stream()
                .mapToLong(SubCategorySummary::getAmount)
                .sum();
    }
}
