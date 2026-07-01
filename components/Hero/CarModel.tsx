import "@google/model-viewer";

export default function CarModel() {
  return (
    <div className="relative h-[420px] w-full">
      <model-viewer
        src="/model/2025_chery_jaecoo_j7.glb"
        alt="Swap Car luxury SUV"
        auto-rotate
        camera-controls
        disable-zoom
        shadow-intensity="1"
        exposure="1.1"
        environment-image="neutral"
        camera-orbit="-35deg 75deg 5m"
        field-of-view="30deg"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      />
    </div>
  );
}
