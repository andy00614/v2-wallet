const Footer = () => {
  return (
    <footer className="text-gray-800 text-center p-4 mt-8">
      <div className="container mx-auto flex-col md:flex md:flex-wrap justify-center items-center">
        <p className="mx-2 text-xs md:text-base">© {new Date().getFullYear()} Dynasty Wallet. All Rights Reserved.</p>
        <div className="flex flex-col md:flex-row">
          <p className="mx-2 text-xs md:text-base">2 International Business Park, Singapore</p>
          <p className="mx-2 text-xs md:text-base">Email: info@dynastywallet.com</p>
          <p className="mx-2 text-xs md:text-base">Phone: (65) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
