package yj.project.lala.application.category;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yj.project.lala.domain.category.Category;
import yj.project.lala.domain.category.CategoryGroup;
import yj.project.lala.domain.category.CategoryRepository;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryView> findAll() {

        return categoryRepository.findAll().stream()
                .map(CategoryFunctions.toView)
                .toList();

    }

    public List<CategoryView> findByGroup(CategoryGroup group) {
        return categoryRepository.findAllByCategoryGroup(group).stream()
                .map(CategoryFunctions.toView)
                .toList();
    }

    @Transactional
    public Long addCategory(CategoryAddRequest request) {
        String refinedCategoryName = request.getName().trim();

        categoryRepository.findByName(refinedCategoryName).ifPresent(category -> {
            throw new IllegalStateException(category.getName() + " 대분류가 이미 존재합니다.");
        });

        Category newCategory = new Category(CategoryGroup.valueOf(request.getCategoryGroup()), refinedCategoryName);
        categoryRepository.save(newCategory);

        return newCategory.getId();
    }
}
