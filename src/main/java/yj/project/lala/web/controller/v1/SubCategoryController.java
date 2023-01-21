package yj.project.lala.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yj.project.lala.application.subcategory.SubCategoryAddRequest;
import yj.project.lala.application.subcategory.SubCategoryService;
import yj.project.lala.application.subcategory.SubCategoryUpdateRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/sub-categories")
public class SubCategoryController {
    private final SubCategoryService subCategoryService;

    @PostMapping
    public Long addNewSubCategory(@RequestBody SubCategoryAddRequest request) {
        return subCategoryService.addSubCategory(request);
    }

    @PutMapping
    public Long changeFixingStatus(@RequestBody SubCategoryUpdateRequest request) {
        return subCategoryService.updateSubCategory(request);
    }
}
