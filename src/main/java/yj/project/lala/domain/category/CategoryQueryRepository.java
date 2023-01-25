package yj.project.lala.domain.category;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static yj.project.lala.domain.category.QCategory.category;
import static yj.project.lala.domain.subcategory.QSubCategory.subCategory;

@Repository
@RequiredArgsConstructor
public class CategoryQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Category> findVariableExpensesCategories() {
        return jpaQueryFactory.selectFrom(category)
                .join(category.subCategories, subCategory)
                .fetchJoin()
                .where(
                        category.categoryGroup.eq(CategoryGroup.EXPENSES),
                        subCategory.fixed.eq(false)
                )
                .fetch();
    }
}
