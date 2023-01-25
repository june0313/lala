package yj.project.lala.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yj.project.lala.application.category.CategoryAddRequest;
import yj.project.lala.application.category.CategoryService;
import yj.project.lala.application.category.CategoryView;
import yj.project.lala.domain.category.CategoryGroup;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public List<CategoryView> findAllCategories() {
        return categoryService.findAll();
    }

    @GetMapping("/income")
    public List<CategoryView> findIncomeCategories() {
        return categoryService.findByGroup(CategoryGroup.INCOME);
    }

    @GetMapping("/expenses")
    public List<CategoryView> findExpensesCategories() {
        return categoryService.findVariableExpensesCategory();
    }

    @PostMapping
    public Long addNewCategory(@RequestBody CategoryAddRequest request) {
       return categoryService.addCategory(request);
    }
}
