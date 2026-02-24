import { LoadingState } from "@/components";

export default function HistoricLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoadingState message="Cargando histórico..." />
    </div>
  );
}
