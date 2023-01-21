package yj.project.lala.domain.ledger;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import yj.project.lala.domain.category.Category;
import yj.project.lala.domain.subcategory.SubCategory;

import java.util.List;

import static yj.project.lala.domain.ledger.QLedger.ledger;

@Repository
@RequiredArgsConstructor
public class LedgerQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Ledger> find(int year, int month) {
        return jpaQueryFactory
                .selectFrom(ledger)
                .where(
                        ledger.year.eq(year),
                        ledger.month.eq(month)
                )
                .fetch();
    }

    public List<Ledger> find(int year, int month, List<Category> categories) {
        return jpaQueryFactory
                .selectFrom(ledger)
                .where(
                        ledger.year.eq(year),
                        ledger.month.eq(month),
                        ledger.category.in(categories)
                )
                .fetch();
    }

    public List<Ledger> findWithSubCategories(int year, int month, List<SubCategory> subCategories) {
        return jpaQueryFactory
                .selectFrom(ledger)
                .where(
                        ledger.year.eq(year),
                        ledger.month.eq(month),
                        ledger.subCategory.in(subCategories)
                )
                .fetch();
    }

}
