import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boiler Plate",
  //   description: "Book Rides",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen">
      <div className="min-h-screen bg-authBg flex flex-col justify-center w-full lg:w-full px-6 absolute right-0">
        <div className="h-full flex items-center justify-center py-4 sm:py-0">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </main>
  );
}
