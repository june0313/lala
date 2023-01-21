package yj.project.lala.application.input;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yj.project.lala.domain.category.CategoryGroup;
import yj.project.lala.domain.category.CategoryRepository;
import yj.project.lala.domain.ledger.LedgerQueryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VariableInputService {
    private final CategoryRepository categoryRepository;
    private final LedgerQueryRepository ledgerQueryRepository;

    public List<VariableInput> findVariableLedgers(int year, int month) {
        var expensesCategories = categoryRepository.findAllByCategoryGroup(CategoryGroup.EXPENSES);

        var variableSubCategories = expensesCategories.stream()
                .flatMap(category -> category.getSubCategories().stream())
                .filter(subCategory -> !subCategory.isFixed())
                .toList();

        var variableLedgers = ledgerQueryRepository.findWithSubCategories(year, month, variableSubCategories);

        return variableLedgers.stream()
                .map(ledger -> new VariableInput(
                        ledger.getId(),
                        ledger.getCategory().getId(),
                        ledger.getCategory().getName(),
                        ledger.getSubCategory().getId(),
                        ledger.getSubCategory().getName(),
                        ledger.getMemo(),
                        ledger.getAmount(),
                        ledger.getDay(),
                        "default pay method"
                ))
                .toList();
    }
}
