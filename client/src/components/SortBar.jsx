import React from "react";
import Select from "./UI/Select";

function SortBar({
  filter,
  setFilter,
  condition,
  setCondition,
  conVal,
  setConVal,
}) {
  return (
    <div className="sortBar">
      <Select
        value={filter}
        onChange={(filt) => setFilter(filt)}
        defaultValue="Колонка"
        options={[
          { value: "_name", name: "По названию" },
          { value: "_quantity", name: "По количеству" },
          { value: "_distance", name: "По расстоянию" },
        ]}
      />
      <Select
        value={condition}
        onChange={(cond) => setCondition(cond)}
        defaultValue="Условие"
        options={[
          { value: "equals", name: "Равно" },
          { value: "contains", name: "Содержит" },
          { value: "larger", name: "Больше" },
          { value: "less", name: "Меньше" },
        ]}
      />
      <input
        type="text"
        value={conVal}
        onChange={(e) => setConVal(e.target.value)}
      />
    </div>
  );
}

export default SortBar;
