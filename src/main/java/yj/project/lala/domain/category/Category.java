package yj.project.lala.domain.category;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yj.project.lala.domain.subcategory.SubCategory;

import java.util.List;

@Entity
@Getter
@Table(name = "category")
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_type")
    @Enumerated(value = EnumType.STRING)
    private CategoryType categoryType;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "category")
    private List<SubCategory> subCategories;

    public Category(CategoryType categoryType, String name) {
        this.categoryType = categoryType;
        this.name = name;
    }
}
