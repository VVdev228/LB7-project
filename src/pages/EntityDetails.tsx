import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { Route } from "../routes/entities/$id"; // Импортируем роут с лоадером

export default function EntityDetails(): JSX.Element {
	// Получение данных, загруженных в роуте
	const entity = useLoaderData({ from: Route.id });
	const navigate = useNavigate();

	return (
		<div className="bg-blue-300 min-h-screen py-8">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Заголовок */}
				<h1 className="text-6xl font-bold text-center text-white mb-8">
					{entity.title}
				</h1>

				{/* Карточка с содержимым */}
				<div className="bg-white rounded-lg shadow-lg p-8 mb-8">
					<div className="space-y-6">
						{/* ID поста */}
						<div className="text-sm text-gray-500">
							<strong>ID:</strong> {entity.id}
						</div>

						{/* Заголовок поста */}
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							{entity.title}
						</h2>

						{/* Описание поста */}
						<div className="text-gray-700 text-lg leading-relaxed">
							{entity.content}
						</div>
					</div>
				</div>

				{/* Кнопки управления */}
				<div className="text-center space-y-4">
					<button
						onClick={() => navigate({ to: "/entities" })}
						className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl mr-4"
					>
						← Назад к публикациям
					</button>
					<button
						onClick={() => navigate({ to: "/" })}
						className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
					>
						На главную
					</button>
				</div>
			</div>
		</div>
	);
}
