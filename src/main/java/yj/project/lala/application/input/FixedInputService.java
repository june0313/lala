package yj.project.lala.application.input;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yj.project.lala.application.ledger.LedgerView;
import yj.project.lala.domain.category.CategoryGroup;
import yj.project.lala.domain.category.CategoryRepository;
import yj.project.lala.domain.ledger.LedgerQueryRepository;
import yj.project.lala.domain.subcategory.SubCategory;

import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FixedInputService {
    private final CategoryRepository categoryRepository;
    private final LedgerQueryRepository ledgerQueryRepository;

    @Transactional
    public List<LedgerView> getInputs(int year, int month, CategoryGroup categoryGroup) {
        var categories = categoryRepository.findAllByCategoryGroup(categoryGroup);
        var fixedSubCategories = categories.stream()
                .flatMap(category -> category.getSubCategories().stream().filter(SubCategory::isFixed))
                .toList();

        var ledgers = ledgerQueryRepository.find(year, month, categories);

        var existInputs = ledgers.stream()
                .map(ledger -> new LedgerView(
                        ledger.getId(),
                        ledger.getAmount(),
                        ledger.getMemo(),
                        ledger.getCategory().getId(),
                        ledger.getCategory().getName(),
                        ledger.getSubCategory().getId(),
                        ledger.getSubCategory().getName(),
                        ledger.getYear(),
                        ledger.getMonth(),
                        ledger.getDay(),
                        ""
                        )
                );

        var notExistFixedInputs = fixedSubCategories.stream()
                .filter(fixedSubCategory -> ledgers.stream().noneMatch(ledger -> ledger.getSubCategory().getId().equals(fixedSubCategory.getId())))
                .map(notExistFixedSubCategory ->
                        new LedgerView(
                                null,
                                0L,
                                "",
                                notExistFixedSubCategory.getCategory().getId(),
                                notExistFixedSubCategory.getCategory().getName(),
                                notExistFixedSubCategory.getId(),
                                notExistFixedSubCategory.getName(),
                                year,
                                month,
                                null,
                                ""
                                )
                );

        return Stream.concat(notExistFixedInputs, existInputs)
                .toList();
    }
}
