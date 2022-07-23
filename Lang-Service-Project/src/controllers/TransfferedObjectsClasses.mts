export class Wrapper {
    objectOfInterest: Object | null= null;
    errors: ErrorWrapper[] = [];
}

export enum CONTEXTS {
    NON = "NON",
    NOUN = "NOUN",
    EXAMPLES = "EXAMPLES",
    TRANSLATIONS = "TRANSLATIONS"
}

export class ErrorWrapper {
    

    constructor(public context: CONTEXTS = CONTEXTS.NON, 
                public error: Error | null = null) {};
}

export class Noun {
    lang: string = ''; 
    singular:string = '';
    plural:string = ''; 
    singularFullForm:string = ''; 
    pluralFullForm:string = ''; 
    gender:string = ''; 
    animate:string = ''; 
    declination_type: string  = '';
    translations: Translations[] = [];
    examples: Examples[] = [];
};

export class Translations {
    
    constructor(public lang: string = '', public translations: string[] = []) {}
}

export class Example {
    
    constructor(public text: string = '',  public translation: string = '') {}
}

export class Examples {

    constructor(public lang: string = '', public examples: Example[] = []) {}
}

