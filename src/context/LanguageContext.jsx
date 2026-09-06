import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translationsData, languageLabels } from './translationsData';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('bisync_lang');
      if (saved && translationsData[saved]) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'EN';
  });

  const setLang = (newLang) => {
    if (translationsData[newLang]) {
      setLangState(newLang);
      try {
        localStorage.setItem('bisync_lang', newLang);
      } catch {
        // ignore
      }
    }
  };

  // Build a reverse lookup map from English string -> key for auto translation of raw English phrases
  const englishPhraseToKey = useMemo(() => {
    const map = new Map();
    const enObj = translationsData.EN || {};
    for (const [key, val] of Object.entries(enObj)) {
      if (typeof val === 'string') {
        map.set(val.trim().toLowerCase(), key);
      }
    }
    return map;
  }, []);

  // Build the intelligent translation object/function
  const t = useMemo(() => {
    const currentLangDict = translationsData[lang] || translationsData.EN;
    const enDict = translationsData.EN;

    // Callable function t(keyOrText, fallback)
    const translateFn = (keyOrText, fallback) => {
      if (!keyOrText) return fallback || '';

      // 1. Direct key lookup in current language
      if (currentLangDict[keyOrText] !== undefined) {
        return currentLangDict[keyOrText];
      }

      // 2. Direct English string lookup matching an English phrase
      const normalized = String(keyOrText).trim().toLowerCase();
      const matchedKey = englishPhraseToKey.get(normalized);
      if (matchedKey && currentLangDict[matchedKey] !== undefined) {
        return currentLangDict[matchedKey];
      }

      // 3. Fallback to English dictionary
      if (matchedKey && enDict[matchedKey] !== undefined) {
        return enDict[matchedKey];
      }
      if (enDict[keyOrText] !== undefined) {
        return enDict[keyOrText];
      }

      // 4. Return user fallback or original string
      return fallback !== undefined ? fallback : keyOrText;
    };

    // Attach all dictionary keys as properties for backwards compatibility with t.prop
    Object.assign(translateFn, enDict, currentLangDict);

    return translateFn;
  }, [lang, englishPhraseToKey]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        languageLabels,
        availableLanguages: Object.keys(translationsData)
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback if used outside provider
    const fallbackFn = (text) => text;
    Object.assign(fallbackFn, translationsData.EN);
    return {
      lang: 'EN',
      setLang: () => {},
      t: fallbackFn,
      languageLabels,
      availableLanguages: Object.keys(translationsData)
    };
  }
  return context;
};

export default LanguageContext;
