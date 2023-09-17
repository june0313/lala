package yj.project.lala.application.input;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yj.project.lala.application.ledger.LedgerView;
import yj.project.lala.domain.category.CategoryType;
import yj.project.lala.domain.category.CategoryRepository;
import yj.project.lala.domain.ledger.LedgerQueryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VariableInputService {
    private final CategoryRepository categoryRepository;
    private final LedgerQueryRepository ledgerQueryRepository;

    public List<LedgerView> findVariableLedgers(int year, int month) {
        var expensesCategories = categoryRepository.findAllByCategoryType(CategoryType.EXPENSES);

        var variableSubCategories = expensesCategories.stream()
                .flatMap(category -> category.getSubCategories().stream())
                .filter(subCategory -> !subCategory.isFixed())
                .toList();

        var variableLedgers = ledgerQueryRepository.findWithSubCategories(year, month, variableSubCategories);

        return variableLedgers.stream()
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
                        "default pay method"
                ))
                .toList();
    }
}
