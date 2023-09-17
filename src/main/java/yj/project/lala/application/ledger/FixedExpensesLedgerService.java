package yj.project.lala.application.ledger;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yj.project.lala.domain.category.CategoryType;
import yj.project.lala.domain.category.CategoryRepository;
import yj.project.lala.domain.ledger.Ledger;
import yj.project.lala.domain.ledger.LedgerQueryRepository;
import yj.project.lala.domain.subcategory.SubCategory;

import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FixedExpensesLedgerService {
    private final CategoryRepository categoryRepository;
    private final LedgerQueryRepository ledgerQueryRepository;

    public List<LedgerView> findAll(int year, int month) {
        var expensesCategories = categoryRepository.findAllByCategoryType(CategoryType.EXPENSES);

        var fixedExpensesSubCategories = expensesCategories.stream()
                .flatMap(category -> category.getSubCategories().stream())
                .filter(SubCategory::isFixed)
                .toList();

        List<Ledger> fixedLedgers = ledgerQueryRepository.findWithSubCategories(year, month, fixedExpensesSubCategories);

        Stream<LedgerView> existFixedLedgerStream = fixedLedgers.stream()
                .map(LedgerFunctions.toView);

        Stream<LedgerView> nonExistFixedLedgerStream = fixedExpensesSubCategories.stream()
                .filter(fixedSubCategory -> fixedLedgers.stream().noneMatch(ledger -> ledger.getSubCategory().getId().equals(fixedSubCategory.getId())))
                .map(notExistFixedSubCategory -> new LedgerView(
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
                ));

        return Stream.concat(existFixedLedgerStream, nonExistFixedLedgerStream).toList();
    }
}
