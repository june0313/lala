package yj.project.lala.application.ledger;

import yj.project.lala.domain.ledger.Ledger;

import java.util.function.Function;

public class LedgerFunctions {

    public static Function<Ledger, LedgerView> toView = ledger -> {
        LedgerView view = new LedgerView();
        view.setId(ledger.getId());
        view.setCategoryName(ledger.getCategory().getName());
        view.setSubCategoryName(ledger.getSubCategory().getName());
        view.setMemo(ledger.getMemo());
        view.setAmount(ledger.getAmount());
        view.setDate(ledger.getDate());
        return view;
    };
}
