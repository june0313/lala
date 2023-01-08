package yj.project.lala.domain.subcategory;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yj.project.lala.domain.category.Category;

@Entity
@Getter
@Table(name = "sub_category")
@NoArgsConstructor
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public SubCategory(String name, Category category) {
        this.name = name;
        this.category = category;
    }
}
