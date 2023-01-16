package yj.project.lala.application.subcategory;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubCategoryUpdateRequest {
    private long subCategoryId;
    private boolean fixed;
}
