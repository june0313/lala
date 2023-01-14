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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "amount")
    private Long amount;
    @Column(name = "memo")
    private String memo;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "sub_category_id")
    private SubCategory subCategory;

    private LocalDate date;

    public void updateMemo(String newMemo) {
        if (newMemo == null) {
            return;
        }

        this.memo = newMemo;
    }

    public void updateAmount(Long newAmount) {
        if (newAmount == null) {
            return;
        }

        this.amount = newAmount;
    }

    public Ledger(Long amount, String memo, Category category, SubCategory subCategory, LocalDate date) {
        this.amount = amount;
        this.memo = memo;
        this.category = category;
        this.subCategory = subCategory;
        this.date = date;
    }
}
