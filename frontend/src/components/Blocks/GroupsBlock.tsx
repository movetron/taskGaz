// src/components/Blocks/GroupsBlock.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, selectGroup, Group } from "../../features/groups/groupsSlice";
import type { RootState, AppDispatch } from "../../app/store";

const GroupsBlock: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, selectedGroupId, loading, error } = useSelector((s: RootState) => s.groups);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  if (loading) return <div className="block">Загрузка групп...</div>;
  if (error)   return <div className="block">Ошибка: {error}</div>;

  return (
    <div className="block">
      <h3>Группы</h3>
      <ul>
        {list.map((g: Group) => (
          <li
            key={g.id}
            onClick={() => dispatch(selectGroup(g.id))}
            style={{
              cursor: "pointer",
              fontWeight: g.id === selectedGroupId ? "bold" : "normal"
            }}
          >
            {g.caption}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsBlock;
