import { LoadingState } from "@/components";

export default function Loading() {
  return (
    <div className="container-main">
      <LoadingState message="Cargando artículos..." />
    </div>
  );
}
