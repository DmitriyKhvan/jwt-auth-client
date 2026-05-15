import { useTranslation } from "react-i18next";
import { languages } from "../model/languages";
import { UiSelectField } from "@/shared/ui/ui-select";
import { LANGUAGES } from "@/shared/constants/languages";

export function LangSwitcher() {
  const { i18n, t } = useTranslation("common");
  return (
    <UiSelectField
      options={languages}
      placeholder={t("language")}
      ariaLabel={t("language")}
      defaultValue={i18n.resolvedLanguage || LANGUAGES.EN}
      onValueChange={(value) => i18n.changeLanguage(value)}
    />
  );
}
