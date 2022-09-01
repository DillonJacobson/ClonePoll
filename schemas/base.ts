import { Prisma } from "@prisma/client";

interface SchemaFilter {
    include?: Array<string>;
    exclude?: Array<string>;
}

interface NestedFilter {
    name: string;
    filters: Filter;
}

interface Filter {
    [key: string]: any;
}

export class Schema {
    private modelName = "";
    private fields: Array<string> = [];

    constructor(modelName: string) {
        this.modelName = modelName;
        let temp_fields = Prisma.dmmf.datamodel.models.find(
            (model) => model.name === this.modelName
        )?.fields;
        if (!temp_fields || temp_fields === undefined)
            throw new Prisma.NotFoundError(
                `Database model ${this.modelName} not found`
            );
        temp_fields?.forEach((field) => {
            this.fields.push(field.name);
        });
    }

    public selectFields(filters?: SchemaFilter, nested?: Array<NestedFilter>) {
        if (filters?.exclude !== undefined && filters?.include !== undefined)
            throw Error(
                "Model query filter recieved both include and exclude filters. Only provide one filter parameter"
            );
        if (filters?.exclude !== undefined && nested !== undefined)
            throw Error(
                "Nested parameters passed to an exclusion filter. Please use include to provide nested parameter filtering"
            );
        let initialState: boolean =
            filters?.include !== undefined && filters?.exclude === undefined
                ? false
                : true;

        let filter: Filter = this.fields.reduce(
            (o, key) => ({ ...o, [key]: initialState }),
            {}
        );
        if (filters === undefined) return filter;

        if (filters.include !== undefined) {
            let nestedNames: Array<string> = [];
            if (nested !== undefined && nested.length > 0) {
                nested.forEach((field) => {
                    filter[field.name] = {select:field.filters};
                    nestedNames.push(field.name);
                });
            }

            filters.include.forEach((name: string) => {
                if (!nestedNames.includes(name)) filter[name] = true;
            });
        }
        if (filters.exclude !== undefined){
            filters.exclude.forEach((name: string) => {
                filter[name] = false;
            });
        }

        return filter;
    }
}