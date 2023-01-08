package yj.project.lala.application.subcategory;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yj.project.lala.domain.category.Category;
import yj.project.lala.domain.category.CategoryRepository;
import yj.project.lala.domain.subcategory.SubCategory;
import yj.project.lala.domain.subcategory.SubCategoryRepository;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class SubCategoryService {
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    @Transactional
    public Long addSubCategory(SubCategoryAddRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new NoSuchElementException("상위 카테고리(" + request.getCategoryId() + ")가 존재하지 않습니다."));

        String refinedSubCategoryName = request.getName().trim();
        subCategoryRepository.findByName(refinedSubCategoryName).ifPresent(subCategory -> {
            throw new IllegalStateException(refinedSubCategoryName + " 소분류가 이미 존재합니다.");
        });

        SubCategory subCategory = new SubCategory(refinedSubCategoryName, category);
        subCategoryRepository.save(subCategory);
        return subCategory.getId();
    }
}
