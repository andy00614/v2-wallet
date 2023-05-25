const Footer = () => {
  return (
    <footer className="text-gray-800 text-center p-4 mt-8">
      <div className="container mx-auto flex-col flex flex-wrap justify-center items-center">
        <p className="mx-2">© {new Date().getFullYear()} Dynasty Wallet. All Rights Reserved.</p>
        <div className="flex">
          <p className="mx-2">2 International Business Park, Singapore</p>
          <p className="mx-2">Email: info@dynastywallet.com</p>
          <p className="mx-2">Phone: (65) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
