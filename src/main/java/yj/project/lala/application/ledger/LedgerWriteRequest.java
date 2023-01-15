package yj.project.lala.application.ledger;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class LedgerWriteRequest {
    private Long ledgerId;
    private Long amount;
    private String memo;
    private Long categoryId;
    private Long subCategoryId;
    @NotNull
    private LocalDate date;
}
