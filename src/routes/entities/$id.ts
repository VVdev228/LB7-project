import { isAxiosError } from "axios";
import { createFileRoute } from "@tanstack/react-router";
import EntityDetails from "../../pages/EntityDetails";
import { getEntityById } from "../../entities";
import type { Entity } from "../../types/Entity"; // імпортуємо тип для Entity

export const Route = createFileRoute("/entities/$id")({
	component: EntityDetails,
	loader: async ({ params: { id } }): Promise<Entity> => {
		try {
			return await getEntityById(id);
		} catch (error) {
			if (isAxiosError(error) && error.response?.status === 404) {
				throw new Error(`Entity with ID ${id} not found`);
			}
			throw error instanceof Error
				? error
				: new Error("Failed to load entity details");
		}
	},
});
