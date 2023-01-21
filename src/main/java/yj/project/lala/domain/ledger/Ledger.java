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
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "sub_category_id", nullable = false)
    private SubCategory subCategory;

    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name = "month", nullable = false)
    private Integer month;

    @Column(name = "day")
    private Integer day;

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

    public Ledger(Long amount, String memo, Category category, SubCategory subCategory, Integer year, Integer month, Integer day) {
        this.amount = amount;
        this.memo = memo;
        this.category = category;
        this.subCategory = subCategory;
        this.year = year;
        this.month = month;
        this.day = day;
    }
}
