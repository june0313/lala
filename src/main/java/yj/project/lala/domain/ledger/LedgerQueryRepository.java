package yj.project.lala.domain.ledger;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
                        ledger.date.year().eq(year)
                                .and(ledger.date.month().eq(month))
                )
                .fetch();
    }
}
