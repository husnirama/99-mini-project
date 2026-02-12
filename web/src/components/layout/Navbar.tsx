import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineEditCalendar } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="h-[100px] w-full">
      <div id="topbar" className="h-10 w-full bg-[#003899] px-10 py-[7px]">
        <ul className="h-full flex justify-end items-center gap-5 text-white">
          <li>Become An Event Creator</li>
          <li>Pricing</li>
          <li>Blog</li>
          <li>Help Center</li>
        </ul>
      </div>
      <div
        id="bottombar"
        className="h-full w-full bg-[#152955] px-10 py-[16px] flex justify-between"
      >
        <div id="leftside" className="flex items-center">
          <ul className="flex justify-between items-center gap-12">
            <li>
              <img
                src="https://assets.loket.com/images/logo-loket-12-white.webp"
                alt="Logo Horizontal"
                className="w-[150px]"
              />
            </li>
            <li>
              <form className="w-[365px] h-[35px] pl-2">
                <div className="h-full w-full shadow-xl rounded-xl flex justify-center items-center ">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Find exciting event here"
                    className="text-white h-full w-8/9"
                  />
                  <button className="h-full w-1/9 bg-[#00499c] rounded-r-xl flex justify-center items-center">
                    <IoSearchOutline className="text-white font-extrabold" />
                  </button>
                </div>
              </form>
            </li>
          </ul>
        </div>
        <div id="rightside" className="flex items-center">
          <ul className="flex justify-between items-center gap-10">
            <li>
              <a
                href=""
                className="flex justify-between items-center gap-2 text-white"
              >
                <MdOutlineEditCalendar className="font-extrabold" />
                Create Event
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex justify-between items-center gap-2 text-white"
              >
                <FaRegCompass className="font-extrabold" />
                Discover Event
              </a>
            </li>
            <li className="flex justify-between items-center gap-5">
              <div className="rounded-lg text-white border-2 flex items-center px-2 py-1 w-full">
                <button className="">Register</button>
              </div>
              <div className="rounded-lg text-white border-2 flex items-center px-2 py-1 w-full">
                <button>Login</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
