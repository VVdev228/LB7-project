import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type JSX } from "react";

import EntityCard from "../components/ui/EntityCard";
import Modal from "../components/ui/Modal";
import { deleteEntity, getAllEntities, updateEntity } from "../entities";
import type { Entity } from "../types/Entity";

export default function Entities(): JSX.Element {
	const navigate = useNavigate();

	const [entities, setEntities] = useState<Array<Entity>>([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedId, setSelectedId] = useState<Entity["id"] | null>(null);

	useEffect(() => {
		const fetchPosts = async (): Promise<void> => {
			try {
				const items = await getAllEntities();
				setEntities(items);
			} catch (error) {
				console.error("Failed to load entities", error);
				alert("Не удалось загрузить публикации. Попробуйте позже.");
			}
		};
		void fetchPosts();
	}, []);

	// --- Удаление ---
	const handleDelete = (id: Entity["id"]): void => {
		setSelectedId(id);
		setShowModal(true);
	};

	const closeModal = (): void => {
		setShowModal(false);
		setSelectedId(null);
	};

	const confirmDelete = async (): Promise<void> => {
		if (selectedId !== null) {
			try {
				await deleteEntity(selectedId);
				setEntities((previousEntities) =>
					previousEntities.filter(
						(existingEntity) => existingEntity.id !== selectedId
					)
				);
				alert("Удалено!");
			} catch (error) {
				console.error("Failed to delete entity", error);
				alert("Не удалось удалить публикацию. Попробуйте позже.");
			}
		}
		closeModal();
	};

	// --- Редактирование ---
	const handleEdit = async (entity: Entity): Promise<void> => {
		const title = prompt("Новое название:", entity.title);
		if (!title || title.trim().length < 3) {
			alert("Слишком короткое название.");
			return;
		}

		const content = prompt("Новое описание:", entity.content);
		if (!content || content.trim().length < 10) {
			alert("Слишком короткое описание.");
			return;
		}

		try {
			const updated = await updateEntity(entity.id, {
				title: title.trim(),
				content: content.trim(),
			});
			setEntities((previousEntities) =>
				previousEntities.map((existingEntity) =>
					existingEntity.id === entity.id ? updated : existingEntity
				)
			);
			alert("Обновлено!");
		} catch (error) {
			console.error("Failed to update entity", error);
			alert("Не удалось обновить публикацию. Попробуйте позже.");
		}
	};

	return (
		<div className="bg-blue-300 min-h-screen py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Заголовок */}
				<h1 className="text-6xl font-bold text-center text-white mb-8">
					Мои публикации
				</h1>

				{/* Сетка карточек */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{entities.map((entityItem) => (
						<EntityCard
							key={entityItem.id}
							entity={entityItem}
							onDelete={() => {
								handleDelete(entityItem.id);
							}}
							onDetails={async () => {
								await navigate({ to: `/entities/${entityItem.id}` });
							}}
							onEdit={async () => {
								await handleEdit(entityItem);
							}}
						/>
					))}
				</div>

				{/* Кнопки управления */}
				<div className="text-center space-y-4">
					<div className="flex flex-wrap justify-center gap-4 mb-4">
						<button
							className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
							onClick={() => navigate({ to: "/entities/new" })}
						>
							Добавить публикацию
						</button>
						<button
							className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
							onClick={() => navigate({ to: "/" })}
						>
							На главную
						</button>
					</div>
				</div>

				{/* Модальное окно подтверждения удаления */}
				<Modal
					bodyMessage="Удалить публикацию?"
					headerMessage="Подтверждение"
					show={showModal}
					onCancel={closeModal}
					onConfirm={confirmDelete}
				/>
			</div>
		</div>
	);
}
