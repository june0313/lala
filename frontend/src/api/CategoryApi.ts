import axios from "axios";

export interface Category {
    categoryId: number
    group: string
    name: string
    subCategories: SubCategory[]
}

export interface SubCategory {
    subCategoryId: number
    fixed: boolean
    name: string
}

const CATEGORY_API_PATH = "/api/v1/categories"
const SUB_CATEGORY_API_PATH = "/api/v1/sub-categories"

export class CategoryApi {
    static async getAllCategories(): Promise<Category[]> {
        const response = await axios.get<Category[]>(CATEGORY_API_PATH);
        return response.data;
    }

    static async addCategory(name: string, group: string): Promise<number> {
        const response = await axios.post<number>(CATEGORY_API_PATH, {
            name: name,
            categoryGroup: group
        });

        return response.data;
    }

    static async addSubCategory(categoryId: number, name: string): Promise<number> {
        const response = await axios.post<number>(SUB_CATEGORY_API_PATH, {
            categoryId: categoryId,
            name: name
        });

        return response.data;
    }

    static async updateSubCategory(subCategoryId: number, fixed: boolean): Promise<number> {
        const response = await axios.put<number>(SUB_CATEGORY_API_PATH, {
            subCategoryId: subCategoryId,
            fixed: fixed
        });

        return response.data;
    }
}