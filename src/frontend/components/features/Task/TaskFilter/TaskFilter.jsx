import { useRef, useCallback } from "react";

import "./TaskFilter.css";

export default function TaskFilter({
  sortField,
  setSortField,
  setSortOrder,
  hasFilter,
  setHasFilter,
}) {
  const formRef = useRef(null);

  const resetFilter = useCallback(() => {
    setSortField(undefined);
    setSortOrder("descending");
    setHasFilter(false);

    formRef.current.reset();
  }, [setSortField, setSortOrder, setHasFilter]);

  const applyFilter = useCallback(
    (event) => {
      event.preventDefault();
      const entries = formRef.current.elements;
      setSortField(entries["filter-field"].value);
      setSortOrder(entries["filter-order"].value);
      setHasFilter(entries["filter-finished"].checked);
    },
    [setSortField, setSortOrder, setHasFilter]
  );

  const FieldOptions = ({ sortField }) => (
    <select id="filter-field" defaultValue={sortField}>
      {["sort by...", "title", "priority", "status", "date"].map((value) => (
        <option value={`${value}`} key={`${value}`} readOnly>
          {value}
        </option>
      ))}
    </select>
  );

  const OrderOptions = () => (
    <select id="filter-order">
      <option value="descending" readOnly>
        descending
      </option>
      <option value="ascending" readOnly>
        ascending
      </option>
    </select>
  );

  return (
    <div className="tasks-filter">
      <form ref={formRef} onSubmit={applyFilter}>
        <div className={"tasks-filter__input"}>
          <FieldOptions sortField={sortField} />
          <OrderOptions />
          <div className={"tasks-filter__checkbox"}>
            <input
              type="checkbox"
              id="filter-finished"
              defaultChecked={hasFilter}
            />
            <label>hide finished</label>
          </div>
        </div>
        <div className={"tasks-filter__buttons"}>
          <button type="submit">apply filters</button>
          <button type="button" onClick={resetFilter}>
            reset filters
          </button>
        </div>
      </form>
    </div>
  );
}
