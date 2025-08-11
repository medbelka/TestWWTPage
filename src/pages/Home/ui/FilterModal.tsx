import { useEffect, useState } from 'react'

import { useFilter } from '../../../store/useFilter'
import { FilterItem, FilterType } from '../../../shared/api/types/Filter'
import { SearchRequestFilter } from '../../../shared/api/types/SearchRequest/SearchRequestFilter'

import filterData from '../../../shared/temp/filterData.json'

export default function FilterModal() {
    const { modalOpen, closeModal, selectedFilters, setFilters } = useFilter();
    const data: FilterItem[] = (filterData as { filterItems: FilterItem[] }).filterItems

    const [tempFilters, setTempFilters] = useState<SearchRequestFilter>([])
    const [confirmOpen, setConfirmOpen] = useState(false)

    useEffect(() => {
        if (modalOpen) {
            setTempFilters(selectedFilters)
            setConfirmOpen(false)
        }
    }, [modalOpen, selectedFilters])

    if (!modalOpen) return null

    const toggleOption = (groupId: string, optionId: string) => {
        setTempFilters((prev) => {
            const existing = prev.find((g) => g.id === groupId);
            if (existing) {
                const isSelected = existing.optionsIds.includes(optionId);
                return prev.map((g) =>
                g.id === groupId
                  ? {
                      ...g,
                      optionsIds: isSelected
                        ? g.optionsIds.filter((id) => id !== optionId)
                        : [...g.optionsIds, optionId],
                    } : g
                )
            }
        return [...prev, { id: groupId, type: FilterType.OPTION, optionsIds: [optionId] }]
        })
    } 

    const handleApplyConfirmed  = () => {
        setFilters(tempFilters)
        closeModal()        
    }

    const handleUseOldFilter = () => {
        setConfirmOpen(false);
        closeModal();
    }
    
    const handleClear = () => {
      setTempFilters([]);
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col overflow-x-hidden relative backdrop-blur-sm">
                                
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b">
                        <h2 className="text-xl font-bold">Filter</h2>
                        <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
                        {data?.map((group) => (
                            <div key={group.id}>
                                <h3 className="text-base font-semibold mb-4">{group.name}</h3>
                                <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                                    {group.options.map((opt) => {
                                        const isChecked = tempFilters.find((g) => g.id === group.id)?.optionsIds.includes(opt.id) || false;
                                    return (
                                        <label key={opt.id} className="flex items-start gap-2 cursor-pointer group relative">
                                            <input
                                              type="checkbox"
                                              className="mt-1"
                                              checked={isChecked}
                                              onChange={() => toggleOption(group.id, opt.id)}
                                            />
                                            <span className="text-sm">{opt.name}</span>

                                            {/* Tooltip */}
                                            {opt.description && (
                                                <div className="absolute left-6 top-full mt-1 w-55 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                                    {opt.description}
                                                </div>
                                            )}
                                        </label>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center px-6 py-4 border-t">
                        <button
                            onClick={handleClear}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Clear all parameters
                        </button>
                        <button
                            onClick={() => setConfirmOpen(true)}
                            className="flex justify-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>

            {confirmOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

                  {/* Вікно підтвердження */}
                    <div className="relative bg-white rounded-lg w-full max-w-3xl p-6 shadow-lg z-[70]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Do you want to apply new filter?</h3>
                            <button
                                onClick={() => setConfirmOpen(false)}
                                className="text-gray-500 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleUseOldFilter}
                                className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-50"
                            >
                                Use old filter
                            </button>
                            <button
                                onClick={handleApplyConfirmed}
                                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
                            >
                                Apply new filter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}