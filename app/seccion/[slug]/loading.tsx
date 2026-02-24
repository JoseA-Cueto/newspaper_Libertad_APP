import { LoadingState } from "@/components";

export default function SectionLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoadingState message="Cargando sección..." />
    </div>
  );
}
