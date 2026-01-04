const MedicineCard = ({ name, dose, tag }) => {
  return (
    <div className="bg-[#f7f8fc] rounded-xl p-4 space-y-1">
      <p className="font-medium text-sm text-slate-900">
        {name}
      </p>
      <p className="text-xs text-slate-500">
        {dose}
      </p>
      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600">
        {tag}
      </span>
    </div>
  );
};

export default MedicineCard;
