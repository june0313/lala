package yj.project.lala.application.input;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yj.project.lala.domain.category.CategoryGroup;
import yj.project.lala.domain.category.CategoryRepository;
import yj.project.lala.domain.ledger.LedgerRepository;
import yj.project.lala.domain.subcategory.SubCategory;

import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FixedInputService {
    private final CategoryRepository categoryRepository;
    private final LedgerRepository ledgerRepository;

    @Transactional
    public List<FixedInput> getInputs(CategoryGroup categoryGroup) {
        var categories = categoryRepository.findAllByCategoryGroup(categoryGroup);
        var fixedSubCategories = categories.stream()
                .flatMap(category -> category.getSubCategories().stream().filter(SubCategory::isFixed))
                .toList();

        var ledgers = ledgerRepository.findAllByCategoryIn(categories);

        var existInputs = ledgers.stream()
                .map(ledger1 -> new FixedInput(
                        ledger1.getId(),
                        ledger1.getCategory().getId(),
                        ledger1.getCategory().getName(),
                        ledger1.getSubCategory().getId(),
                        ledger1.getSubCategory().getName(),
                        ledger1.getMemo(),
                        ledger1.getAmount())
                );

        var notExistFixedInputs = fixedSubCategories.stream()
                .filter(fixedSubCategory -> ledgers.stream().noneMatch(ledger -> ledger.getSubCategory().getId().equals(fixedSubCategory.getId())))
                .map(notExistFixedSubCategory ->
                        new FixedInput(
                                null,
                                notExistFixedSubCategory.getCategory().getId(),
                                notExistFixedSubCategory.getCategory().getName(),
                                notExistFixedSubCategory.getId(),
                                notExistFixedSubCategory.getName(),
                                "",
                                0L)
                );


        return Stream.concat(notExistFixedInputs, existInputs)
                .toList();
    }
}
