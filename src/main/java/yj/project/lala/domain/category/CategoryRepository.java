package yj.project.lala.domain.category;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByCategoryType(CategoryType categoryType);

    Optional<Category> findByName(String name);
}
