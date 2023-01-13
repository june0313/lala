package yj.project.lala.application.input;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yj.project.lala.domain.category.CategoryGroup;
import yj.project.lala.domain.category.CategoryRepository;
import yj.project.lala.domain.ledger.Ledger;
import yj.project.lala.domain.ledger.LedgerRepository;
import yj.project.lala.domain.subcategory.SubCategory;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InputService {
    private final CategoryRepository categoryRepository;
    private final LedgerRepository ledgerRepository;

    @Transactional
    public List<Input> getInputs(CategoryGroup categoryGroup) {
        var categories = categoryRepository.findAllByCategoryGroup(categoryGroup);
        var incomes = ledgerRepository.findAllByCategoryIn(categories);

        return categories.stream()
                .flatMap(category -> category.getSubCategories().stream())
                .map(subCategory -> newInput(subCategory, incomes))
                .toList();
    }

    private Input newInput(SubCategory subCategory, List<Ledger> incomes) {

        Optional<Ledger> matchingLedger = incomes.stream()
                .filter(ledger -> ledger.getSubCategory().getId().equals(subCategory.getId()))
                .findFirst();

        if (matchingLedger.isPresent()) {
            Ledger ledger1 = matchingLedger.get();

            return new Input(ledger1.getId(), ledger1.getCategory().getId(), ledger1.getCategory().getName(), ledger1.getSubCategory().getId(), ledger1.getSubCategory().getName(), ledger1.getMemo(), ledger1.getAmount());
        }

        return new Input(
                null,
                subCategory.getCategory().getId(),
                subCategory.getCategory().getName(),
                subCategory.getId(),
                subCategory.getName(),
                "",
                0L
        );
    }
}
