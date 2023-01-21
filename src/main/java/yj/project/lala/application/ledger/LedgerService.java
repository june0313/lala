package yj.project.lala.application.ledger;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yj.project.lala.domain.category.Category;
import yj.project.lala.domain.ledger.Ledger;
import yj.project.lala.domain.ledger.LedgerQueryRepository;
import yj.project.lala.domain.ledger.LedgerRepository;
import yj.project.lala.domain.subcategory.SubCategory;
import yj.project.lala.domain.subcategory.SubCategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LedgerService {
    private final LedgerRepository ledgerRepository;
    private final LedgerQueryRepository ledgerQueryRepository;
    private final SubCategoryRepository subCategoryRepository;

    @Transactional
    public LedgerView write(LedgerWriteRequest request) {
        if (request.getLedgerId() == null) {
            return create(request);
        } else {
            return update(request);
        }
    }

    private LedgerView create(LedgerWriteRequest request) {
        SubCategory subCategory = subCategoryRepository.findById(request.getSubCategoryId()).orElseThrow();
        Category category = subCategory.getCategory();
        Ledger ledger = new Ledger(request.getAmount(), request.getMemo(), category, subCategory, request.getYear(), request.getMonth(), request.getDay());

        ledgerRepository.save(ledger);
        return LedgerFunctions.toView.apply(ledger);
    }

    private LedgerView update(LedgerWriteRequest request) {
        Ledger ledger = ledgerRepository.findById(request.getLedgerId()).orElseThrow();
        Optional.ofNullable(request.getMemo()).ifPresent(ledger::updateMemo);
        Optional.ofNullable(request.getAmount()).ifPresent(ledger::updateAmount);
        return LedgerFunctions.toView.apply(ledger);
    }

    public List<LedgerView> findAll(int year, int month) {
        return ledgerQueryRepository.find(year, month)
                .stream()
                .map(LedgerFunctions.toView)
                .toList();
    }
}
