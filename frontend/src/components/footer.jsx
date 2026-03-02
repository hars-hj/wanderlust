export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="flex flex-col items-center gap-4 py-6 text-gray-700">

        {/* Social Icons */}
        <div className="flex gap-6 text-xl">
          <i className="fa-brands fa-instagram hover:text-black cursor-pointer"></i>
          <i className="fa-brands fa-facebook hover:text-black cursor-pointer"></i>
          <i className="fa-brands fa-linkedin hover:text-black cursor-pointer"></i>
        </div>

        {/* Brand */}
        <div className="text-sm font-medium">
          © WonderLust Private Limited
        </div>

        {/* Links */}
        <div className="flex gap-4 text-sm">
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
        </div>

      </div>
    </footer>
  );
}
