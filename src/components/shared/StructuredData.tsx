interface StructuredDataProps {
  id?: string;
  data: Record<string, unknown>;
}

export default function StructuredData({ id, data }: StructuredDataProps) {
  return (
    <script id={id} type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(data)}
    </script>
  );
}
