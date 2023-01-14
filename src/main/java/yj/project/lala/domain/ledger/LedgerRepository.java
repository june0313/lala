package yj.project.lala.domain.ledger;

import org.springframework.data.jpa.repository.JpaRepository;
import yj.project.lala.domain.category.Category;

import java.util.List;

public interface LedgerRepository extends JpaRepository<Ledger, Long> {
    List<Ledger> findAllByCategoryIn(List<Category> categoryIds);
}
