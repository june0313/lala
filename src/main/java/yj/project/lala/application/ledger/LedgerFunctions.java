package yj.project.lala.application.ledger;

import yj.project.lala.domain.ledger.Ledger;

import java.util.function.Function;

public class LedgerFunctions {

    public static Function<Ledger, LedgerView> toView = ledger -> new LedgerView(
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
    );
}
