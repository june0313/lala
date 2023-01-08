package yj.project.lala.domain.ledger;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LedgerRepository extends JpaRepository<Ledger, Long> {
    List<Ledger> findAllByLedgerType(LedgerType type);
}
