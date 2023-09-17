package yj.project.lala.application.input;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yj.project.lala.application.ledger.LedgerFunctions;
import yj.project.lala.application.ledger.LedgerView;
import yj.project.lala.domain.category.Category;
import yj.project.lala.domain.category.CategoryType;
import yj.project.lala.domain.category.CategoryRepository;
import yj.project.lala.domain.ledger.Ledger;
import yj.project.lala.domain.ledger.LedgerQueryRepository;
import yj.project.lala.domain.subcategory.SubCategory;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InputService {
    private final CategoryRepository categoryRepository;
    private final LedgerQueryRepository ledgerQueryRepository;

    public List<LedgerView> findLedgers(int year, int month, CategoryType categoryType) {
        List<Category> categories = categoryRepository.findAllByCategoryType(categoryType);

        List<Ledger> fixedLedgers = categories.stream()
                .flatMap(category -> category.getSubCategories().stream())
                .filter(SubCategory::isFixed)
                .map(subCategory -> findFixedLedger(year, month, subCategory))
                .toList();

        List<SubCategory> variableSubCategories = categories.stream()
                .flatMap(category -> category.getSubCategories().stream())
                .filter(subCategory -> !subCategory.isFixed())
                .toList();

        List<Ledger> variableLedgers = ledgerQueryRepository.findWithSubCategories(year, month, variableSubCategories);

        List<Ledger> allLedgers = new ArrayList<>();
        allLedgers.addAll(fixedLedgers);
        allLedgers.addAll(variableLedgers);

        return allLedgers.stream()
                .map(LedgerFunctions.toView)
                .toList();
    }

    private Ledger findFixedLedger(int year, int month, SubCategory subCategory) {
        return ledgerQueryRepository.find(year, month, subCategory)
                .orElse(new Ledger(0L, "", subCategory.getCategory(), subCategory, year, month, null));
    }
}
