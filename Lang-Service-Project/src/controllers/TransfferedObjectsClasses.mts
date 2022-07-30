// class ContentWrapper {
//     objects: ObjectWrapper[] = [];
// }

class ObjectWrapper<T> {
    constructor(public objectOfInterest: T | null = null, 
                public errors: ErrorWrapper[] = []) {}
}

enum CONTEXTS {
    NON = "NON",
    NOUN = "NOUN",
    EXAMPLES = "EXAMPLES",
    TRANSLATIONS = "TRANSLATIONS",
    LANGUAGES = "LANGUAGES",
    ALPHABET = "ALPHABET",
    GENDER = "GENDER",
    ANIMATE = "ANIMATE",
    DECLINATION_TYPE = "DECLINATION_TYPE",
    LANG_SETTINGS = "LANG_SETTINGS",
    DIACRITICS = "DIACRITICS"
}

class ErrorWrapper {
    constructor(public context: CONTEXTS = CONTEXTS.NON, 
                public error: Error | null = null,
                public lang: string = '',
                public text: string = '') {};
}

class Language {
    constructor(public lang: string ='', public description: string = '') {}
}

class LanguagesPerRequest {
    constructor(public fromLang: string ='', 
                public toLang: string[] = []) {}
}

class Noun {
    lang: string = ''; 
    singular:string = '';
    plural:string = ''; 
    singularFullForm:string = ''; 
    pluralFullForm:string = ''; 
    gender:string = ''; 
    animate:string = ''; 
    declination_type: string  = '';
    translations: WordTranslations[] = [];
    examples: Example[] = [];

    constructor() {}

    getKey() {
        return {
                lang: this.lang,
                singular: this.singular
               };
    }
}

class WordTranslations {
    constructor(public lang: string = '', public translations: string[] = []) {}
}

class Example {
    constructor(public text: string = '',  public translations: ExampleTranslation[] = []) {}
}

class ExampleTranslation {
    constructor(public lang: string = '', public translation: string = '') {}
}

class AlphabetLetter {
    lang: string = ''; 
    letter: string = '';
    letter_name_lang: string = '';
    letter_name: string = '';
    transliteration: string = '';
    IPA: string = '';
    order1: number = -1;
    order2: number = -1;
    order3: number = -1;
    order4: number = -1;
    order5: number = -1;
    letter_type1: string = '';
    letter_type2: string = '';
}

class Alphabet {
    letters: AlphabetLetter[] = [];
}

class Characteristics {
    gender: ObjectWrapper<CharacteristicElement[]> = new ObjectWrapper(); //in use for nouns and adjectives in some languages
    animate: ObjectWrapper<CharacteristicElement[]> = new ObjectWrapper(); //noun charachteristic in some languages
    declination_type: ObjectWrapper<CharacteristicElement[]> = new ObjectWrapper(); //noun charachteristic in some languages
    //and more to go
}

class CharacteristicElement {
    constructor(public type: string, public description:string) {}
}

// class Gender {
//     constructor(public type: string, public description:string) {}
// }

// class Animate {
//     constructor(public type: string, public description:string) {}
// }

// class Declination_type {
//     constructor(public type: string, public description:string) {}
// }

class LangSettings {
    lang:string = '';
    noun_singular_plural_sep:string = '';
    unicode_range:string = '';
    unicode_range_to_check:string = '';
    unicode_diacritics_to_check:string = '';
    alphabet_order1_name:string = '';
    alphabet_order2_name:string = '';
    alphabet_order3_name:string = '';
    alphabet_order4_name:string = '';
    alphabet_order5_name:string = '';
    write_direction:string = '';
}

class Diacritic {
    lang:string = '';
    diacritic:string = '';
    name_lang:string = '';
    name:string = '';
    transliteration:string = '';
    IPA:string = '';
}

class Diacritics {
    diacritics: Diacritic[] = [];
}

export {ObjectWrapper, CONTEXTS, ErrorWrapper, Language, LanguagesPerRequest,
        Noun, WordTranslations, Example, ExampleTranslation, Characteristics,
        AlphabetLetter, Alphabet, CharacteristicElement, LangSettings, Diacritics,
        Diacritic};

