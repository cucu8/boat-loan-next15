export default function ErrorComponent({
  message = "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
}) {
  return (
    <div className=" flex flex-col items-center justify-center text-center px-4">
      <div className="w-full overflow-hidden whitespace-nowrap border-y-2 border-red-400 py-2 mb-8">
        <div className="text-xl text-red-600 font-semibold">⚠️ {message}</div>
      </div>

      <h1 className="text-6xl font-bold text-red-600! mb-4 animate-marquee boats-spinner-text">
        HATA
      </h1>
      <p className="text-lg text-red-700">{message}</p>
    </div>
  );
}
