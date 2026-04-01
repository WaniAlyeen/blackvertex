import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Admin Dashboard | Black Vertex",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#050505] min-h-screen font-sans text-foreground selection:bg-accent/30 selection:text-white">
      {children}
    </div>
  );
}
