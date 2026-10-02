import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { MenuItem, SelectedOption } from '../types';

interface CustomizerModalProps {
  item: MenuItem;
  onClose: () => void;
  onConfirm: (selectedOptions: SelectedOption[]) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  item,
  onClose,
  onConfirm,
}) => {
  const [selectedMap, setSelectedMap] = useState<Record<string, string>>(() => {
    const initialMap: Record<string, string> = {};
    item.optionGroups?.forEach((group) => {
      if (group.options.length > 0) {
        initialMap[group.id] = group.options[0].id;
      }
    });
    return initialMap;
  });

  const handleSelectOption = (groupId: string, optionId: string) => {
    setSelectedMap((prev) => ({ ...prev, [groupId]: optionId }));
  };

  const calculateTotalPrice = () => {
    let price = item.price;
    item.optionGroups?.forEach((group) => {
      const selectedOptionId = selectedMap[group.id];
      const foundOption = group.options.find((o) => o.id === selectedOptionId);
      if (foundOption) {
        price += foundOption.price;
      }
    });
    return price;
  };

  const handleAddItem = () => {
    const selectedOptionsList: SelectedOption[] = [];
    item.optionGroups?.forEach((group) => {
      const selectedOptionId = selectedMap[group.id];
      const foundOption = group.options.find((o) => o.id === selectedOptionId);
      if (foundOption) {
        selectedOptionsList.push({
          groupId: group.id,
          groupTitle: group.title,
          optionId: foundOption.id,
          optionName: foundOption.name,
          price: foundOption.price,
        });
      }
    });
    onConfirm(selectedOptionsList);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
              Customize "{item.name}"
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Personalize your dish options
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
            id="close-customizer-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {item.optionGroups?.map((group) => (
            <div key={group.id} className="border-b border-slate-100 pb-5 last:border-b-0">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  {group.title}
                </h4>
                {group.required && (
                  <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-sm">
                    Required
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {group.options.map((option) => {
                  const isSelected = selectedMap[group.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(group.id, option.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'border-[#FC8019] bg-orange-50/50 text-slate-900 shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                      id={`option-${group.id}-${option.id}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected ? 'border-[#FC8019] bg-[#FC8019]' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <span className="text-sm font-semibold">{option.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-600">
                        {option.price > 0 ? `+₹${option.price}` : 'Free'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Total Price</div>
            <div className="text-xl font-extrabold text-slate-900">
              ₹{calculateTotalPrice()}
            </div>
          </div>

          <button
            onClick={handleAddItem}
            className="bg-[#FC8019] hover:bg-orange-600 text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-md shadow-orange-500/20 transition-all transform active:scale-95"
            id="confirm-customizer-add"
          >
            Add to Cart • ₹{calculateTotalPrice()}
          </button>
        </div>

      </div>
    </div>
  );
};
