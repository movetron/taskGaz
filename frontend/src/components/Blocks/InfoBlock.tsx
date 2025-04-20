import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatus } from "../../features/info/infoSlice";
import type { RootState, AppDispatch } from "../../app/store";

const InfoBlock = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, loading, error } = useSelector((state: RootState) => state.info);

  useEffect(() => {
    dispatch(fetchStatus());
  }, [dispatch]);

  if (loading) return <div className="block">Загрузка статуса...</div>;
  if (error) return <div className="block">Ошибка: {error}</div>;
  if (status === null) return <div className="block">Нет данных</div>;

  return (
    <div className="block">
      <h3>Общая информация</h3>
      <p>Наихудший статус: <strong>{status}</strong></p>
    </div>
  );
};

export default InfoBlock;
