import { useFilter } from '../../../store/useFilter'
import FilterModal from './FilterModal'
import filterData from '../../../shared/temp/filterData.json'
import { FilterItem } from '../../../shared/api/types/Filter'

export const App = () => {
	const { openModal, selectedFilters } = useFilter()

	// Масив груп фільтрів
  const allFilters: FilterItem[] = (filterData as { filterItems: FilterItem[] }).filterItems;

  // Формуємо список назв вибраних опцій
  const selectedNames: string[] = selectedFilters.flatMap((group) => {
    const filterGroup = allFilters.find((f) => f.id === group.id);
    if (!filterGroup) return [];
    return group.optionsIds.map(
      (optId) => filterGroup.options.find((opt) => opt.id === optId)?.name || ''
    );
  }).filter(Boolean);

	return (
		<section className="w-full h-dvh flex items-center justify-center">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-6xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>
			<button
				onClick={openModal}
				className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
			>
				Filters
			</button>

			<pre className="bg-gray-100 p-4 rounded w-[500px] text-sm overflow-auto">
        		{selectedNames.map((name) => `(${name})`).join(' ')}
      		</pre>

			<FilterModal />
		</section>
	)
}
