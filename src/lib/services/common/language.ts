import enUS from "../../../locales/en-US.json";
import viVN from "../../../locales/vi-VN.json";

const detectLanguage = () => {
  const { language } = window.navigator;

  return Promise.resolve({ data: language });
};

const getLanguageTranslationByCode = (code: string) => {
  const languages = {
    "en-US": enUS,
    "vi-VN": viVN,
  };
  const result = languages[code as keyof typeof languages];

  if (!result) {
    return Promise.resolve({ data: enUS });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: result });
    }, 1000);
  });
};

const getUserLanguageTranslation = async () => {
  const { data: code } = await detectLanguage();
  const { data: translation } = (await getLanguageTranslationByCode(code)) as {
    data: Record<string, string>;
  };

  return {
    code,
    translation,
  };
};

export { detectLanguage, getLanguageTranslationByCode, getUserLanguageTranslation };
