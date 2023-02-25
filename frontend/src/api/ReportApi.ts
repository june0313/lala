import axios from "axios";

export interface CategorySummary {
    categoryName: string,
    totalAmount: number,
    subCategorySummaries: SubCategorySummary[]
}

export interface SubCategorySummary {
    subCategoryName: string,
    amount: number
}

export class ReportApi {
    static async findReport(year: number, month: number): Promise<CategorySummary[]> {
        const response = await axios.get<CategorySummary[]>("/api/v1/report", {
            params :{
                year: year,
                month: month
            }
        });

        return response.data;
    }
}