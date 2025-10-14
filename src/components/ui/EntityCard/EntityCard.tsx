import type { Entity } from "../../../types/Entity";
import {JSX} from "react";

interface Props {
	entity: Entity;
	onEdit: () => void;
	onDelete: () => void;
	onDetails: () => void;
}

export default function EntityCard({
	entity,
	onEdit,
	onDelete,
	onDetails,
}: Props): JSX.Element {
	return (
		<div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
			{/* Заголовок */}
			<h2 className="text-xl font-bold text-gray-900 mb-3">{entity.title}</h2>

			{/* Описание */}
			<p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
				{entity.content}
			</p>

			{/* Действия */}
			<div className="flex justify-between items-center">
				<button
					onClick={onDetails}
					className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700 transition-colors duration-200"
				>
					Прочитать пост
				</button>

				<div className="flex gap-2">
					{/* Кнопка исправления */}
					<button
						onClick={onEdit}
						className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700 transition-colors duration-200"
					>
						Исправить
					</button>

					{/* Кнопка удаления */}
					<button
						onClick={onDelete}
						className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-700 transition-colors duration-200"
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
}
