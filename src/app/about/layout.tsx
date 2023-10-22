export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <div className="">sidebar</div>
      <div className="">{children}</div>
    </section>
  );
}
