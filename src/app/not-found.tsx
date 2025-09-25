import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center flex flex-col gap-8 items-center py-44">
      <h2 className="text-9xl font-bold capitalize">404 not found</h2>
      <p className="font-medium text-lg">
        Your visited page not found. You may go home page.
      </p>
      <Link href="/" className="py-3 px-9 bg-primary rounded-md text-white">
        <p className="text-lg font-medium">Back to home page</p>
      </Link>
    </div>
  );
}
