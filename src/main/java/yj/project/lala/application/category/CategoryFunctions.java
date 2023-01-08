package yj.project.lala.application.category;

import yj.project.lala.domain.category.Category;

import java.util.function.Function;

public class CategoryFunctions {
    public static final Function<Category, CategoryView> toView = c -> {
        CategoryView categoryView = new CategoryView();
        categoryView.setCategoryId(c.getId());
        categoryView.setGroup(c.getCategoryGroup().name());
        categoryView.setName(c.getName());
        categoryView.setSubCategories(
                c.getSubCategories().stream()
                        .map(s -> {
                            SubCategoryView subCategoryView = new SubCategoryView();
                            subCategoryView.setSubCategoryId(s.getId());
                            subCategoryView.setName(s.getName());
                            return subCategoryView;
                        })
                        .toList()
        );
        return categoryView;
    };
}
