package yj.project.lala.application.ledger;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yj.project.lala.domain.category.Category;
import yj.project.lala.domain.category.CategoryRepository;
import yj.project.lala.domain.ledger.Ledger;
import yj.project.lala.domain.ledger.LedgerRepository;
import yj.project.lala.domain.ledger.LedgerType;
import yj.project.lala.domain.subcategory.SubCategory;
import yj.project.lala.domain.subcategory.SubCategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LedgerService {
    private final LedgerRepository ledgerRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    @Transactional
    public void write(LedgerWriteRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow();
        SubCategory subCategory = subCategoryRepository.findById(request.getSubCategoryId()).orElseThrow();

        Ledger ledger = new Ledger(request.getAmount(), request.getMemo(), request.getLedgerType(), category, subCategory, request.getDate());

        ledgerRepository.save(ledger);
    }

    @Transactional
    public LedgerView update(LedgerUpdateRequest request) {
        Ledger ledger = ledgerRepository.findById(request.getLedgerId())
                .orElseThrow();

        Optional.ofNullable(request.getMemo()).ifPresent(ledger::updateMemo);

        return LedgerFunctions.toView.apply(ledger);
    }

    public List<LedgerView> findAll() {
        return ledgerRepository.findAll()
                .stream()
                .map(LedgerFunctions.toView)
                .toList();
    }

    public List<LedgerView> findAllByType(LedgerType type) {
        return ledgerRepository.findAllByLedgerType(type)
                .stream()
                .map(LedgerFunctions.toView)
                .toList();
    }
}
