// src/components/Blocks/StatusBlock.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceStatus  } from "../../features/status/statusSlice";
import type { RootState, AppDispatch } from "../../app/store";

const StatusBlock: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { serviceStatus, loading, error } = useSelector((state: RootState) => state.status);
  const { selectedGroupId } = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    if (selectedGroupId) {
      dispatch(fetchServiceStatus (selectedGroupId));
    }
  }, [dispatch, selectedGroupId]);

  if (loading) return <div className="block">Загрузка статуса...</div>;
  if (error)   return <div className="block">Ошибка: {error}</div>;

  return (
    <div className="block status-block">
      <h3>Статус сервиса</h3>
      {serviceStatus ? (
        <div
          style={{
            padding: "10px",
            backgroundColor: serviceStatus.color,
            color: "white",
            borderRadius: "5px",
          }}
        >
          <p>{serviceStatus.description}</p>
        </div>
      ) : (
        <div>Выберите группу</div>
      )}
    </div>
  );
};

export default StatusBlock;
