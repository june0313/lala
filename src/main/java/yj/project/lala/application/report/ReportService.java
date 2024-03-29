package yj.project.lala.application.report;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yj.project.lala.application.report.model.CategorySummary;
import yj.project.lala.application.report.model.SubCategorySummary;
import yj.project.lala.domain.category.Category;
import yj.project.lala.domain.ledger.Ledger;
import yj.project.lala.domain.ledger.LedgerQueryRepository;
import yj.project.lala.domain.subcategory.SubCategory;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.summingLong;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final LedgerQueryRepository ledgerQueryRepository;

    public List<CategorySummary> getCategorySummary(int year, int month) {

        List<Ledger> ledgers = ledgerQueryRepository.find(year, month);

        Map<Category, List<Ledger>> ledgersByCategory = ledgers.stream()
                .collect(groupingBy(Ledger::getCategory));

        return ledgersByCategory.entrySet().stream()
                .map(this::toCategorySummary)
                .sorted(Comparator.comparingInt(report -> report.getCategoryType().ordinal()))
                .toList();
    }

    private CategorySummary toCategorySummary(Map.Entry<Category, List<Ledger>> entry) {
        var category = entry.getKey();
        var ledgerGroup = entry.getValue();

        return CategorySummary.builder()
                .categoryType(category.getCategoryType())
                .categoryName(category.getName())
                .subCategorySummaries(toSubCategorySummaries(ledgerGroup))
                .build();
    }

    private List<SubCategorySummary> toSubCategorySummaries(List<Ledger> ledgerGroup) {
        Map<SubCategory, Long> subCategoryAmountSummary = ledgerGroup.stream()
                .collect(groupingBy(Ledger::getSubCategory, summingLong(Ledger::getAmount)));

        return subCategoryAmountSummary
                .entrySet().stream()
                .map(entry -> SubCategorySummary.builder()
                        .subCategoryName(entry.getKey().getName())
                        .amount(entry.getValue())
                        .build())
                .toList();
    }
}
