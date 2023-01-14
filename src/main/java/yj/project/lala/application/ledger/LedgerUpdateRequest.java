package yj.project.lala.application.ledger;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LedgerUpdateRequest {
    @NotNull
    private Long ledgerId;
    private String memo;

}
