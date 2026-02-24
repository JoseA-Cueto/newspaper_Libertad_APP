import { LoadingState } from "@/components";

export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoadingState message="Cargando artículo..." />
    </div>
  );
}
