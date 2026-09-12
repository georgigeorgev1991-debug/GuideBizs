export function ConceptBanner({ mark }: { mark: string }) {
  return (
    <p
      role="note"
      className="border border-blaze-ui bg-blaze-ui/15 px-4 py-3 text-sm font-semibold"
    >
      {mark}
    </p>
  );
}
