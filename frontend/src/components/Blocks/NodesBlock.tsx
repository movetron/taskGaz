// src/components/Blocks/NodesBlock.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNodes, Node } from "../../features/nodes/nodesSlice";
import type { RootState, AppDispatch } from "../../app/store";

const NodesBlock: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedGroupId } = useSelector((s: RootState) => s.groups);
  const { list, loading, error }     = useSelector((s: RootState) => s.nodes);

  useEffect(() => {
    dispatch(fetchNodes(selectedGroupId));
  }, [dispatch, selectedGroupId]);

  if (loading) return <div className="block">Загрузка нод...</div>;
  if (error)   return <div className="block">Ошибка: {error}</div>;

  return (
    <div className="block">
      <h3>Ноды</h3>
      <ul>
        {list.map((n: Node) => (
          <li key={n.id}>{n.caption}</li>
        ))}
      </ul>
    </div>
  );
};

export default NodesBlock;
