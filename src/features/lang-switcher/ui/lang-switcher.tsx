import { useTranslation } from "react-i18next";
import { languages } from "../model/languages";
import { UiButton } from "@/shared/ui/ui-button";

export function LangSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div>
      {Object.entries(languages).map(([lng, value]) => (
        <UiButton
          variant="outlined"
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          disabled={i18n.resolvedLanguage === lng}
        >
          {value.nativeName}
        </UiButton>
      ))}
    </div>
  );
}
