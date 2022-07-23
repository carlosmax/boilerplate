import { FieldValidation } from '@/src/protocols';
export declare class RequiredFieldValidation implements FieldValidation {
    readonly field: string;
    constructor(field: string);
    validate(input: object): Error;
}
