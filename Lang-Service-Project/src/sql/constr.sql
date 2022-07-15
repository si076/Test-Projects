ALTER TABLE lang.lang_settings
    ADD CONSTRAINT fk_lang_settings_lang FOREIGN KEY
     (lang)
    REFERENCES lang.language (lang)