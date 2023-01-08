package yj.project.lala.domain.ledger;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yj.project.lala.domain.category.Category;
import yj.project.lala.domain.subcategory.SubCategory;

import java.time.LocalDate;

@Entity
@Getter
@Table(name = "ledger")
@NoArgsConstructor
public class Ledger {
    @Id
    private Long id;
    @Column(name = "amount")
    private Long amount;
    @Column(name = "memo")
    private String memo;
    @Column(name = "type")
    @Enumerated(value = EnumType.STRING)
    private LedgerType ledgerType;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "sub_category_id")
    private SubCategory subCategory;

    private LocalDate date;

    public Ledger(Long amount, String memo, LedgerType ledgerType, Category category, SubCategory subCategory, LocalDate date) {
        this.amount = amount;
        this.memo = memo;
        this.ledgerType = ledgerType;
        this.category = category;
        this.subCategory = subCategory;
        this.date = date;
    }
}
