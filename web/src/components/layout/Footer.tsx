function Footer() {
  return (
    <footer>
      <div
        id="top-footer"
        className="min-h-screen mt-23 h-[575px] px-[40px] bg-[#112041]"
      >
        <div className="flex justify-center py-10">
          <div className="h-[277px] w-[80vw] flex items-center border-2 border-black py-2 px-2">
            <div className="w-1/4 h-full flex justify-between items-center border-2 border-red-700"></div>
            <div className="w-1/4 h-full flex justify-between items-center border-2 border-red-700"></div>
            <div className="w-1/4 h-full flex justify-between items-center border-2 border-red-700"></div>
            <div className="w-1/4 h-full flex justify-between items-center border-2 border-red-700"></div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="h-[93px] w-[80vw] flex flex-col items-center border-2 border-black py-2 px-2 mb-10">
            <div className="w-full h-full border-2 border-red-700"></div>
            <div className="w-full h-full border-2 border-red-700"></div>
          </div>
        </div>
        <h6 className="mb-[10px] text-center">IKUTI KAMI</h6>
        <div id="contact-icons" className="grid"></div>
      </div>
    </footer>
  );
}
export default Footer;
