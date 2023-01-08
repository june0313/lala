package yj.project.lala.domain.subcategory;

import jakarta.persistence.*;
import lombok.Getter;
import yj.project.lala.domain.category.Category;

@Entity
@Getter
@Table(name = "sub_category")
public class SubCategory {
    @Id
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
