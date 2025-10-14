import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createEntity } from "../entities";

export default function EntityCreate(): JSX.Element {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (name.trim().length < 3 || description.trim().length < 10) {
			alert("Назва має містити щонайменше 3 символи, а опис — 10.");
			return;
		}

		try {
			await createEntity({
				title: name.trim(),
				content: description.trim(),
			});
			alert("Сутність створена!");
			navigate({ to: "/entities" });
		} catch (error) {
			console.error("Failed to create entity", error);
			alert("Не вдалося створити публікацію. Спробуйте пізніше.");
		}
	};

	return (
		<div className="bg-blue-300 font-bold w-screen min-h-screen flex flex-col justify-center items-center p-8">
			<div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl">
				<h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
					Створити нову публікацію
				</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="name"
							className="block text-lg font-bold text-gray-700 mb-2"
						>
							Назва публікації:
						</label>
						<input
							type="text"
							id="name"
							value={name}
							className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
							placeholder="Введіть назву публікації..."
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div>
						<label
							htmlFor="description"
							className="block text-lg font-bold text-gray-700 mb-2"
						>
							Опис публікації:
						</label>
						<textarea
							id="description"
							rows={6}
							value={description}
							className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg resize-none"
							placeholder="Введіть детальний опис публікації..."
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					<div className="flex justify-between items-center pt-4">
						<button
							type="button"
							className="bg-gray-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
							onClick={() => navigate({ to: "/entities" })}
						>
							Скасувати
						</button>

						<button
							type="submit"
							className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
						>
							Створити публікацію
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
