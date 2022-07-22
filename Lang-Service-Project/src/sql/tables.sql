CREATE TABLE `animate` (
  `type` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `category` (
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `declination_accusative_case_ar` (
  `declination_type` char(2) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `indefinite` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `definite` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `idafa` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`declination_type`,`indefinite`,`definite`,`idafa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `declination_adjective_cases_tables` (
  `lang` char(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `case_name` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `case_table` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`lang`,`case_name`,`case_table`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `declination_genitive_case_ar` (
  `declination_type` char(2) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `indefinite` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `definite` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `idafa` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`declination_type`,`indefinite`,`definite`,`idafa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `declination_nominative_case_ar` (
  `declination_type` char(2) COLLATE utf8_unicode_ci NOT NULL,
  `indefinite` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `definite` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `idafa` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`declination_type`,`indefinite`,`definite`,`idafa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `declination_noun_cases_tables` (
  `lang` char(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `case_name` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `case_table` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`lang`,`case_name`,`case_table`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `declination_pronoun_cases_tables` (
  `lang` char(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `case_name` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `case_table` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`lang`,`case_name`,`case_table`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `declination_type` (
  `lang` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `type` char(2) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `example` (
  `uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `lang` char(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `text` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `fk_example_lang` (`lang`),
  CONSTRAINT `fk_example_lang` FOREIGN KEY (`lang`) REFERENCES `language` (`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `example_word` (
  `lang` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `word` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `example_uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`lang`,`word`,`example_uuid`),
  CONSTRAINT `fk_example_word_lang` FOREIGN KEY (`lang`) REFERENCES `language` (`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `gender` (
  `type` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `lang_settings` (
  `lang` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `noun_singular_plural_sep` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `unicode_range` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `unicode_range_to_check` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `unicode_diacritics_to_check` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `alphabet_order1_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `alphabet_order2_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `alphabet_order3_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `alphabet_order4_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `alphabet_order5_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang`),
  CONSTRAINT `fk_lang_settings_lang` FOREIGN KEY (`lang`) REFERENCES `language` (`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `language` (
  `lang` char(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `noun` (
  `lang` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `singular` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `plural` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `singularFullForm` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pluralFullForm` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `animate` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `declination_type` char(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang`,`singular`),
  KEY `sec_gender` (`gender`),
  KEY `fk_noun_animate` (`animate`),
  KEY `fk_noun_declination_type` (`lang`,`declination_type`),
  CONSTRAINT `fk_noun_animate` FOREIGN KEY (`animate`) REFERENCES `animate` (`type`),
  CONSTRAINT `fk_noun_declination_type` FOREIGN KEY (`lang`, `declination_type`) REFERENCES `declination_type` (`lang`, `type`),
  CONSTRAINT `fk_noun_gen` FOREIGN KEY (`gender`) REFERENCES `gender` (`type`),
  CONSTRAINT `fk_noun_lang` FOREIGN KEY (`lang`) REFERENCES `language` (`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `translation` (
  `from_lang` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `word` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `index` int NOT NULL,
  `to_lang` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `translation` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`from_lang`,`word`,`index`,`to_lang`),
  KEY `sec_translation` (`translation`),
  KEY `fk_translation_to_lang` (`to_lang`),
  CONSTRAINT `fk_translation_lang` FOREIGN KEY (`from_lang`) REFERENCES `language` (`lang`),
  CONSTRAINT `fk_translation_to_lang` FOREIGN KEY (`to_lang`) REFERENCES `language` (`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `word_category` (
  `lang` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `word` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `index` int NOT NULL,
  `category` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`lang`,`word`,`index`,`category`),
  CONSTRAINT `fk_word_category_lang` FOREIGN KEY (`lang`) REFERENCES `language` (`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `lang`.`example_translation` (
  `from_lang` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `example_uuid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `index` int NOT NULL,
  `to_lang` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `translation` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`from_lang`,`example_uuid`,`index`,`to_lang`),
  KEY `fk_translation_to_lang` (`to_lang`),
  KEY `sec_translation` (`translation`),
  CONSTRAINT `fk_example_translation_from_lang` FOREIGN KEY (`from_lang`) REFERENCES `language` (`lang`),
  CONSTRAINT `fk_example_translation_to_lang` FOREIGN KEY (`to_lang`) REFERENCES `language` (`lang`),
  CONSTRAINT `fk_example_translation_uuid` FOREIGN KEY (`example_uuid`) REFERENCES `example` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `alphabet` (
  `lang` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `letter` char(2) COLLATE utf8_unicode_ci NOT NULL,
  `letter_name_lang` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `letter_name` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `transliteration` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IPA` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order1` tinyint DEFAULT NULL,
  `order2` tinyint DEFAULT NULL,
  `order3` tinyint DEFAULT NULL,
  `order4` tinyint DEFAULT NULL,
  `order5` tinyint DEFAULT NULL,
  `letter_type1` char(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `letter_type2` char(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang`,`letter`),
  CONSTRAINT `fk_alphabet_lang` FOREIGN KEY (`lang`) REFERENCES `language` (`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `diacritics` (
  `lang` char(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `diacritic` char(2) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `name_lang` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `transliteration` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `IPA` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang`,`diacritic`),
  CONSTRAINT `fk_diacritics_lang` FOREIGN KEY (`lang`) REFERENCES `language` (`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
CREATE TABLE `letter_type` (
  `type` char(2) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
CREATE TABLE `letter_type_lang` (
  `lang` char(5) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `type` char(2) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang`,`type`),
  CONSTRAINT `fk_letter_type_lang_lang` FOREIGN KEY (`lang`) REFERENCES `language` (`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;





