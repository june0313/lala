package yj.project.lala.domain.ledger;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import yj.project.lala.domain.category.Category;

import java.util.List;

import static yj.project.lala.domain.ledger.QLedger.ledger;

@Repository
@RequiredArgsConstructor
public class LedgerQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Ledger> find(int year, int month) {
        return jpaQueryFactory
                .selectFrom(ledger)
                .where(yearAndMonthEq(year, month))
                .fetch();
    }

    public List<Ledger> find(int year, int month, List<Category> categories) {
        return jpaQueryFactory
                .selectFrom(ledger)
                .where(
                        yearAndMonthEq(year, month),
                        ledger.category.in(categories)
                )
                .fetch();
    }

    private BooleanExpression yearAndMonthEq(int year, int month) {
        return ledger.date.year().eq(year)
                .and(ledger.date.month().eq(month));
    }
}
