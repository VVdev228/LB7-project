import api from "../api";
import type { Entity } from "../types/Entity";

// Интерфейс для типизации ответа от API
type ApiResponse<T> = T | {
	data: T;
	message?: string;
	status?: string;
};

const extractPayload = <T>(payload: ApiResponse<T>): T => {
	if (
		typeof payload === "object" &&
		payload !== null &&
		"data" in payload &&
		(payload as { data?: unknown }).data !== undefined
	) {
		return (payload as { data: T }).data;
	}

	return payload as T;
};

// Получение всех сущностей с сервера
export const getAllEntities = async (): Promise<Array<Entity>> => {
	try {
		const response = await api.get<ApiResponse<Array<Entity>>>("/posts");
		console.log("Ответ API:", response.data);

		const payload = extractPayload(response.data);

		if (!Array.isArray(payload)) {
			throw new Error("API вернуло некорректные данные: ожидался массив");
		}

		return payload.map((item) => ({
			id: item.id,
			title: item.title, // Преобразуем title в name, если нужно
			content: item.content, // Преобразуем content в description, если нужно
		}));
	} catch (error) {
		console.error("Ошибка при получении данных:", error);
		return [];
	}
};

// Получение сущности по ID с сервера
export const getEntityById = async (
	id: number
): Promise<Entity | undefined> => {
	try {
		const response = await api.get<ApiResponse<Entity>>(`/posts/${id}`);
		console.log("Ответ API по id:", response.data);

		const payload = extractPayload(response.data);

		return {
			id: payload.id,
			title: payload.title,
			content: payload.content,
		};
	} catch (error) {
		console.error(`Ошибка при получении сущности с id ${id}:`, error);
		return undefined;
	}
};

// Создание новой сущности на сервере
export const createEntity = async (
	entity: Partial<Entity>
): Promise<Entity | undefined> => {
	try {
		const response = await api.post<ApiResponse<Entity>>("/posts", {
			title: entity.title,
			content: entity.content,
		});

		console.log("Созданная сущность:", response.data);

		const payload = extractPayload(response.data);

		return {
			id: payload.id,
			title: payload.title,
			content: payload.content,
		};
	} catch (error) {
		console.error("Ошибка при создании сущности:", error);
		return undefined;
	}
};

// Обновление сущности на сервере
export const updateEntity = async (
	id: number,
	data: Partial<Entity>
): Promise<Entity | undefined> => {
	try {
		const response = await api.put<ApiResponse<Entity>>(`/posts/${id}`, {
			title: data.title,
			content: data.content,
			updatedAt: new Date().toISOString(),
		});

		console.log("Обновлённая сущность:", response.data);

		const payload = extractPayload(response.data);

		return {
			id: payload.id,
			title: payload.title,
			content: payload.content,
		};
	} catch (error) {
		console.error(`Ошибка при обновлении сущности с id ${id}:`, error);
		return undefined;
	}
};

// Удаление сущности на сервере
export const deleteEntity = async (id: number): Promise<void> => {
	try {
		await api.delete(`/posts/${id}`);
		console.log(`Сущность с id ${id} успешно удалена`);
	} catch (error) {
		console.error(`Ошибка при удалении сущности с id ${id}:`, error);
	}
};
