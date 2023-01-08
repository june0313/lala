package yj.project.lala.application.category;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryView {
    private Long categoryId;
    private String group;
    private String name;
    private List<SubCategoryView> subCategories;
}
