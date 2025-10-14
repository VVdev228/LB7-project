import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import type { FunctionComponent } from "../common/types";

export const Home = (): FunctionComponent => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();

	const onTranslateButtonClick = async (): Promise<void> => {
		if (i18n.resolvedLanguage === "en") {
			await i18n.changeLanguage("es");
		} else {
			await i18n.changeLanguage("en");
		}
	};

	return (
		<div className="bg-blue-300 font-bold w-screen h-screen flex flex-col justify-center items-center space-y-8">
			<p className="text-white text-6xl">{t("home.greeting")}</p>

			<div className="flex flex-col space-y-4">
				<button
					className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
					onClick={() => navigate({ to: "/entities" })}
				>
					Управление публикациями
				</button>

				<button
					className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
					type="submit"
					onClick={onTranslateButtonClick}
				>
					Перевести
				</button>
			</div>
		</div>
	);
};
