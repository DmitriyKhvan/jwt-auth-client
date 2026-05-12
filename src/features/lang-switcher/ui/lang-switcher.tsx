import { useTranslation } from "react-i18next";
import { languages } from "../model/languages";
import { UiSelectField } from "@/shared/ui/ui-select";
import { LANGUAGES } from "@/shared/constants/languages";

export function LangSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div>
      <UiSelectField
        options={languages}
        defaultValue={i18n.resolvedLanguage || LANGUAGES.EN}
        onValueChange={(value) => i18n.changeLanguage(value)}
      />
    </div>
  );
}
