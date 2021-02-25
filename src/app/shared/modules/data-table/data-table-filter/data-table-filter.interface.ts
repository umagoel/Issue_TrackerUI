import { Dictionary } from 'lodash';


export interface DataTableFilter {
    appliedFilter: boolean;
    filteredRow: Array<Dictionary<{}>>;
}
