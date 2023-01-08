package yj.project.lala.web.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yj.project.lala.application.subcategory.SubCategoryAddRequest;
import yj.project.lala.application.subcategory.SubCategoryService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/sub-categories")
public class SubCategoryController {
    private final SubCategoryService subCategoryService;

    @PostMapping
    public Long addNewSubCategory(@RequestBody SubCategoryAddRequest request) {
        return subCategoryService.addSubCategory(request);
    }
}
