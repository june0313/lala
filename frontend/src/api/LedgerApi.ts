import axios, {AxiosResponse} from "axios";

export interface Ledger {
    id?: number,
    amount: number,
    memo: string,
    categoryId: number;
    categoryName: string,
    subCategoryId: number,
    subCategoryName: string,
    year: number,
    month: number,
    day?: number,
    paymentMethod?: string
}

interface LedgerUpdateRequest {
    id?: number,
    amount: number,
    memo: string,
    categoryId: number,
    subCategoryId: number,
    year: number,
    month: number,
    day?: number,
    paymentMethod?: string
}

export class LedgerApi {
    static async findVariableExpenses(year: number, month: number): Promise<Ledger[]> {
        const response = await axios.get<Ledger[]>("/api/v1/input/variable", {
                params: {
                    year: year,
                    month: month
                }
            }
        );

        return response.data;
    }

    static async updateLedger(request: LedgerUpdateRequest): Promise<Ledger> {
        const response = await axios.post<Ledger, AxiosResponse<Ledger>, LedgerUpdateRequest>("/api/v1/ledgers", request);
        return response.data;
    }
}