import type { Exercise } from "../data/exercises";
import PageHeader from "../components/PageHeader";
import PhysioTab from "../components/PhysioTab";

export default function PhysioPage({ onSelect }: { onSelect: (exercise: Exercise) => void }) {
  return (
    <>
      <PageHeader eyebrow="Seguimiento" title="Fisioterapia" description="Tu trabajo prescrito, organizado por frecuencia para que sea fácil de seguir." />
      <PhysioTab onSelect={onSelect} />
    </>
  );
}
